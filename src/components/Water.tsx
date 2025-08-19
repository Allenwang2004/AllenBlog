'use client';
import { useEffect, useRef } from 'react';

const WaveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let t = 0;

    const drawWave = () => {
      ctx.clearRect(0, 0, width, height);

      // 畫背景漸層水色
    //   const gradient = ctx.createLinearGradient(0, height * 0.5, 0, height);
    //   gradient.addColorStop(0, '#001d3d');  // 深藍
    //   gradient.addColorStop(1, '#003566');  // 淺藍
    //   ctx.fillStyle = gradient;
    //   ctx.fillRect(0, height * 0.5, width, height * 0.5);

      // 畫水平線
    //   ctx.beginPath();
    //   ctx.moveTo(0, height * 0.5);
    //   ctx.lineTo(width, height * 0.5);
    //   ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    //   ctx.stroke();

      // 畫動態波浪（使用 sin）
      ctx.beginPath();
      for (let x = 0; x <= width; x++) {
        const y =
          height * 0.5 +
          Math.sin(x * 0.02 + t) * 10 +         // 主波
          Math.sin(x * 0.05 + t * 1.5) * 5;     // 次波
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fill();

      t += 0.03;
      requestAnimationFrame(drawWave);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    drawWave();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
};

export default WaveBackground;