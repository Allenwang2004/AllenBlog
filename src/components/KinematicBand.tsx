'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * One gait signal, three morphologies — and the visitor holds the signal.
 *
 * Three humanoid linkages with deliberately different limb proportions are
 * driven from a single phase variable. Drag the band (or use the arrow keys)
 * to scrub that phase by hand; each ankle leaves a fading trace of the cycle
 * its own body produces.
 *
 * Runs on one 2D canvas with no dependencies, and the animation frame is only
 * scheduled while the band is playing, on screen, and the tab is visible.
 */

type Morphology = {
  name: string;
  ratio: string;
  thigh: number;
  shin: number;
  torso: number;
  upperArm: number;
  lowerArm: number;
  shoulderW: number;
  hipW: number;
  neck: number;
  headR: number;
};

const MORPHOLOGIES: Morphology[] = [
  {
    name: 'baseline',
    ratio: '1.00',
    thigh: 0.26,
    shin: 0.25,
    torso: 0.3,
    upperArm: 0.2,
    lowerArm: 0.19,
    shoulderW: 0.19,
    hipW: 0.13,
    neck: 0.06,
    headR: 0.075,
  },
  {
    name: 'long-limbed',
    ratio: '1.22',
    thigh: 0.32,
    shin: 0.31,
    torso: 0.24,
    upperArm: 0.24,
    lowerArm: 0.22,
    shoulderW: 0.16,
    hipW: 0.11,
    neck: 0.05,
    headR: 0.065,
  },
  {
    name: 'compact',
    ratio: '0.78',
    thigh: 0.2,
    shin: 0.19,
    torso: 0.28,
    upperArm: 0.16,
    lowerArm: 0.15,
    shoulderW: 0.22,
    hipW: 0.17,
    neck: 0.04,
    headR: 0.095,
  },
];

/** Standing height of the tallest morphology, in body units. */
const TALLEST = Math.max(
  ...MORPHOLOGIES.map((m) => m.thigh + m.shin + m.torso + m.neck + 2 * m.headR)
);

type Palette = {
  link: string;
  joint: string;
  core: string;
  trace: string;
  ground: string;
};

const PALETTES: Record<'light' | 'dark', Palette> = {
  light: {
    link: '#1F6F5C',
    joint: '#101A19',
    core: '#ECEEE9',
    trace: 'rgba(31, 111, 92, 0.55)',
    ground: 'rgba(16, 26, 25, 0.14)',
  },
  dark: {
    link: '#4B9E88',
    joint: '#E6EAE8',
    core: '#101A19',
    trace: 'rgba(75, 158, 136, 0.5)',
    ground: 'rgba(177, 187, 185, 0.14)',
  },
};

type Point = { x: number; y: number };

const TRACE_LENGTH = 120;
const SPEED = 0.045;
/** Radians of gait phase per pixel dragged. */
const DRAG_GAIN = 0.012;
const KEY_STEP = 0.25;

/** Walk one link outward from `from`, where angle 0 points straight down. */
function extend(from: Point, angle: number, length: number): Point {
  return {
    x: from.x + Math.sin(angle) * length,
    y: from.y + Math.cos(angle) * length,
  };
}

/** Full-body forward kinematics for one morphology at one phase. */
function solve(m: Morphology, phase: number, root: Point, u: number) {
  const hipSwing = 0.42;
  const armSwing = 0.3;

  const legAngles = [phase, phase + Math.PI].map((p) => {
    const thighAngle = hipSwing * Math.sin(p);
    const kneeFlex = 0.95 * Math.max(0, Math.sin(p + 1.15));
    return { thighAngle, shinAngle: thighAngle - kneeFlex };
  });

  const armAngles = [phase + Math.PI, phase].map((p) => {
    const upperAngle = armSwing * Math.sin(p);
    const elbowFlex = 0.32 + 0.28 * Math.max(0, Math.sin(p));
    return { upperAngle, foreAngle: upperAngle + elbowFlex };
  });

  // Vertical bob runs at twice the step frequency.
  const pelvis = { x: root.x, y: root.y - Math.cos(2 * phase) * 0.012 * u };
  const lean = 0.05;

  const chest = extend(pelvis, Math.PI + lean, m.torso * u);
  const neck = extend(chest, Math.PI + lean, m.neck * u);
  const head = extend(neck, Math.PI + lean, m.headR * u);

  const links: [Point, Point][] = [
    [pelvis, chest],
    [chest, neck],
  ];
  const joints: Point[] = [pelvis, chest];
  const ankles: Point[] = [];

  [-1, 1].forEach((side, i) => {
    const hip = { x: pelvis.x + side * m.hipW * u * 0.5, y: pelvis.y };
    const knee = extend(hip, legAngles[i].thighAngle, m.thigh * u);
    const ankle = extend(knee, legAngles[i].shinAngle, m.shin * u);
    const toe = extend(
      ankle,
      legAngles[i].shinAngle + Math.PI / 2.1,
      m.shin * u * 0.32
    );

    links.push([hip, knee], [knee, ankle], [ankle, toe]);
    joints.push(hip, knee, ankle);
    ankles.push(ankle);

    const shoulder = { x: chest.x + side * m.shoulderW * u * 0.5, y: chest.y };
    const elbow = extend(shoulder, armAngles[i].upperAngle, m.upperArm * u);
    const hand = extend(elbow, armAngles[i].foreAngle, m.lowerArm * u);

    links.push([chest, shoulder], [shoulder, elbow], [elbow, hand]);
    joints.push(shoulder, elbow, hand);
  });

  return { links, joints, head, headR: m.headR * u, ankles };
}

export default function KinematicBand() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const engineRef = useRef<{
    start: () => void;
    stop: () => void;
    render: () => void;
    // eslint-disable-next-line no-unused-vars
    scrub: (delta: number) => void;
  } | null>(null);

  const stateRef = useRef({ phase: 0, active: -1 });
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(true);
  const [active, setActive] = useState(-1);

  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);
  themeRef.current = resolvedTheme;

  // ---- canvas engine -------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;

    const traces: Point[][][] = MORPHOLOGIES.map(() => [[], []]);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      traces.forEach((figure) => figure.forEach((t) => (t.length = 0)));
    };

    const render = () => {
      if (!width || !height) return;
      const { phase, active: hot } = stateRef.current;
      const palette = PALETTES[themeRef.current === 'dark' ? 'dark' : 'light'];

      ctx.clearRect(0, 0, width, height);

      // Size from whichever axis binds first, then centre the row vertically.
      const u = Math.min((height * 0.8) / TALLEST, (width / 3) * 0.72);
      const groundY = Math.round(height / 2 + (TALLEST * u) / 2);

      ctx.strokeStyle = palette.ground;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width * 0.03, groundY + 0.5);
      ctx.lineTo(width * 0.97, groundY + 0.5);
      ctx.stroke();

      MORPHOLOGIES.forEach((m, index) => {
        const x = (width * (index * 2 + 1)) / 6;
        const root = { x, y: groundY - (m.thigh + m.shin) * u };
        const { links, joints, head, headR, ankles } = solve(m, phase, root, u);
        const dim = hot >= 0 && hot !== index;

        ankles.forEach((ankle, side) => {
          const trace = traces[index][side];
          const last = trace[trace.length - 1];
          if (
            !last ||
            Math.abs(last.x - ankle.x) + Math.abs(last.y - ankle.y) > 0.4
          ) {
            trace.push(ankle);
            if (trace.length > TRACE_LENGTH) trace.shift();
          }
        });

        ctx.globalAlpha = dim ? 0.25 : 1;

        traces[index].forEach((trace) => {
          if (trace.length < 3) return;
          ctx.lineWidth = 1;
          ctx.strokeStyle = palette.trace;
          for (let i = 1; i < trace.length; i++) {
            ctx.globalAlpha = (i / trace.length) * (dim ? 0.18 : 0.55);
            ctx.beginPath();
            ctx.moveTo(trace[i - 1].x, trace[i - 1].y);
            ctx.lineTo(trace[i].x, trace[i].y);
            ctx.stroke();
          }
          ctx.globalAlpha = dim ? 0.25 : 1;
        });

        ctx.strokeStyle = palette.link;
        ctx.lineWidth = hot === index ? 2.4 : 1.8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        links.forEach(([a, b]) => {
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
        });
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(head.x, head.y, headR, 0, Math.PI * 2);
        ctx.stroke();

        // Joints read as drawn markers: filled core, inked ring.
        joints.forEach((j) => {
          ctx.beginPath();
          ctx.arc(j.x, j.y, hot === index ? 2.9 : 2.4, 0, Math.PI * 2);
          ctx.fillStyle = palette.core;
          ctx.fill();
          ctx.strokeStyle = palette.joint;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        });

        ctx.globalAlpha = 1;
      });

      // Written straight to the DOM so scrubbing never re-renders React.
      const wrapped = ((phase % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      if (readoutRef.current) {
        readoutRef.current.textContent = `φ ${wrapped.toFixed(2)} rad`;
      }
      wrap.setAttribute(
        'aria-valuenow',
        String(Math.round((wrapped * 180) / Math.PI))
      );
    };

    const loop = () => {
      stateRef.current.phase += SPEED;
      render();
      raf = requestAnimationFrame(loop);
    };

    const engine = {
      start: () => {
        if (!raf) raf = requestAnimationFrame(loop);
      },
      stop: () => {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      },
      render,
      scrub: (delta: number) => {
        stateRef.current.phase += delta;
        render();
      },
    };
    engineRef.current = engine;

    resize();
    render();

    const ro = new ResizeObserver(() => {
      resize();
      render();
    });
    ro.observe(canvas);

    return () => {
      engine.stop();
      ro.disconnect();
      engineRef.current = null;
    };
  }, []);

  // ---- only animate when it can actually be seen ---------------------------
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '120px' }
    );
    io.observe(wrap);

    const onVisibility = () => setInView(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    if (playing && inView) engine.start();
    else engine.stop();
  }, [playing, inView]);

  useEffect(() => {
    engineRef.current?.render();
  }, [resolvedTheme, active]);

  // Someone who asked for less motion gets a still plate they can still drive.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      stateRef.current.phase = 0.9;
      setPlaying(false);
      engineRef.current?.render();
    }
  }, []);

  // ---- pointer + keyboard --------------------------------------------------
  const dragRef = useRef({ down: false, lastX: 0, resume: false });

  const figureAt = useCallback((clientX: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return -1;
    const third = Math.floor(((clientX - rect.left) / rect.width) * 3);
    return Math.min(2, Math.max(0, third));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { down: true, lastX: e.clientX, resume: playing };
    setPlaying(false);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const hot = figureAt(e.clientX);
    if (hot !== stateRef.current.active) {
      stateRef.current.active = hot;
      setActive(hot);
    }
    if (!dragRef.current.down) return;
    engineRef.current?.scrub((e.clientX - dragRef.current.lastX) * DRAG_GAIN);
    dragRef.current.lastX = e.clientX;
  };

  const endDrag = (e?: React.PointerEvent<HTMLDivElement>) => {
    // Touch has no hover state to fall out of, so clear the highlight here.
    if (e && e.pointerType !== 'mouse') {
      stateRef.current.active = -1;
      setActive(-1);
    }
    if (!dragRef.current.down) return;
    const { resume } = dragRef.current;
    dragRef.current.down = false;
    if (resume) setPlaying(true);
  };

  const onPointerLeave = () => {
    stateRef.current.active = -1;
    setActive(-1);
    endDrag();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setPlaying(false);
      engineRef.current?.scrub(KEY_STEP);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setPlaying(false);
      engineRef.current?.scrub(-KEY_STEP);
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setPlaying((p) => !p);
    }
  };

  return (
    <figure className="m-0">
      <div
        ref={wrapRef}
        role="slider"
        tabIndex={0}
        aria-label="Gait phase"
        aria-valuemin={0}
        aria-valuemax={360}
        aria-valuenow={0}
        aria-valuetext="Drag or use the arrow keys to drive the gait"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={onPointerLeave}
        onKeyDown={onKeyDown}
        className="drafting-grid relative h-[160px] w-full touch-pan-y select-none overflow-hidden rounded-xl border border-gray-300/70 bg-surface transition-colors hover:border-gray-400 dark:border-gray-800 dark:bg-gray-950/40 dark:hover:border-gray-600 sm:h-[240px] lg:h-[300px]"
        style={{ cursor: 'ew-resize' }}
      >
        <canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 block size-full"
        />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {MORPHOLOGIES.map((m, i) => (
          <div
            key={m.name}
            className={`text-center font-mono text-[11px] transition-colors ${
              i === active
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <span className="block">{m.name}</span>
            <span className="tabular block text-gray-400 dark:text-gray-500">
              limb ×{m.ratio}
            </span>
          </div>
        ))}
      </div>

      <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-gray-200 pt-3 dark:border-gray-800">
        <p className="font-mono text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
          <span className="text-gray-700 dark:text-gray-300">Fig. 1</span> One
          gait signal, three morphologies. Drag the plate to drive it.
        </p>

        <div className="flex items-center gap-4">
          <span
            ref={readoutRef}
            className="tabular font-mono text-[11px] text-gray-400 dark:text-gray-500"
          />
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="rounded-md border border-gray-300 px-3 py-1 font-mono text-[11px] text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-400 dark:hover:text-gray-50"
          >
            {playing ? 'Pause' : 'Play'}
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
