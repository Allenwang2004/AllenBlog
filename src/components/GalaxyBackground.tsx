import { useEffect, useRef } from 'react';

const GalaxyBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({
    x: 0,
    y: 0,
    speed: 0,
    lastX: 0,
    lastY: 0,
    isPressed: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const superStar = {
      x: width / 12,
      y: height / 8,
      radius: 30,
      color: 'gold',
    };

    const stars = Array.from({ length: 500 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.5 + 0.2,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
    }));

    const friction = 0.85;
    const ufo = {
      x: width / 2,
      y: height / 2,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 畫大恆星
      ctx.beginPath();
      ctx.arc(superStar.x, superStar.y, superStar.radius, 0, Math.PI * 2);
      ctx.fillStyle = superStar.color;
      ctx.shadowColor = superStar.color;
      ctx.shadowBlur = 30;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.closePath();

      // 更新星星
      for (let star of stars) {
        const distX = mouse.current.x - star.x;
        const distY = mouse.current.y - star.y;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < 200) {
          const force = (200 - distance) / 200;
          const angle = Math.atan2(distY, distX);
          star.dx += Math.cos(angle) * force * 0.08;
          star.dy += Math.sin(angle) * force * 0.08;
        }

        star.dx *= friction;
        star.dy *= friction;

        star.x += star.dx + star.speed * 0.1;
        star.y += star.dy + star.speed * 0.1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
      }

      // ========================
      // ✅ 飛碟也受滑鼠吸引
      // ========================
      const distX = mouse.current.x - ufo.x;
      const distY = mouse.current.y - ufo.y;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < 500) { // ⭐ 吸引距離可以設比較遠一點
        const force = (300 - distance) / 300;
        const angle = Math.atan2(distY, distX);
        ufo.dx += Math.cos(angle) * force * 0.05; // 力量小一點
        ufo.dy += Math.sin(angle) * force * 0.05;
      }

      // 更新飛碟位置
      ufo.x += ufo.dx;
      ufo.y += ufo.dy;
      ufo.dx += (Math.random() - 0.5) * 0.05;
      ufo.dy += (Math.random() - 0.5) * 0.05;

      // 飛碟撞星星，星星被撞開
      for (let star of stars) {
        const distX = ufo.x - star.x;
        const distY = ufo.y - star.y;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < 30) {
          const force = (30 - distance) / 30;
          const angle = Math.atan2(distY, distX);
          ufo.dx += Math.cos(angle) * force * 3;
          ufo.dy += Math.sin(angle) * force * 3;
          star.dx -= Math.cos(angle) * force * 10.0;
          star.dy -= Math.sin(angle) * force * 10.0;
        }
      }

      const maxSpeed = 3;
      ufo.dx = Math.max(-maxSpeed, Math.min(maxSpeed, ufo.dx));
      ufo.dy = Math.max(-maxSpeed, Math.min(maxSpeed, ufo.dy));

      if (ufo.x < 0 || ufo.x > width) ufo.dx *= -1;
      if (ufo.y < 0 || ufo.y > height) ufo.dy *= -1;

      ctx.beginPath();
      ctx.ellipse(ufo.x, ufo.y, 8, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default GalaxyBackground;