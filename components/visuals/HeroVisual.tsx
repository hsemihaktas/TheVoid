"use client";

import React, { useRef, useEffect } from "react";

const HeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  // TypedArray Buffers
  // [curX, curY, curZ, heroX, heroY, heroZ, scatterX, scatterY, scatterZ]
  // 9 floats per particle
  const STRIDE = 9;
  const particlesDataRef = useRef<Float32Array>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Performance: Cap DPI at 2 to avoid excessive pixels on 3x/4x screens
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let isMobile = width < 768;
    let numPoints = isMobile ? 300 : 800;
    let baseRadius = Math.min(width, height) * 0.22;

    // Initialize particles function
    const initParticles = () => {
      if (
        !particlesDataRef.current ||
        particlesDataRef.current.length !== numPoints * STRIDE
      ) {
        particlesDataRef.current = new Float32Array(numPoints * STRIDE);
      }

      const data = particlesDataRef.current;
      for (let i = 0; i < numPoints; i++) {
        const off = i * STRIDE;

        // Star Point
        const y = 1 - (i / (numPoints - 1)) * 2;
        const r = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = 2.3999632 * i;
        const surfaceNoise = 0.9 + Math.random() * 0.2;

        const hx = Math.cos(theta) * r * baseRadius * surfaceNoise;
        const hy = y * baseRadius * surfaceNoise;
        const hz = Math.sin(theta) * r * baseRadius * surfaceNoise;

        // Scatter Point
        const rangeX = width * 2.5;
        const rangeY = height * 2.5;
        const rangeZ = 3500;

        const sx = (Math.random() - 0.5) * rangeX;
        const sy = (Math.random() - 0.5) * rangeY;
        const sz = (Math.random() - 0.5) * rangeZ;

        // Fill Data
        data[off] = hx; // curX
        data[off + 1] = hy; // curY
        data[off + 2] = hz; // curZ
        data[off + 3] = hx; // heroX
        data[off + 4] = hy; // heroY
        data[off + 5] = hz; // heroZ
        data[off + 6] = sx; // scatterX
        data[off + 7] = sy; // scatterY
        data[off + 8] = sz; // scatterZ
      }
    };

    // Initial init
    initParticles();

    let time = 0;
    let currentCenterX = width * 0.75;
    let currentCenterY = height * 0.5;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseRef.current = {
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
      };
    };

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPos = window.scrollY;
      const scrollProgress = Math.min(
        1,
        Math.max(0, scrollPos / (docHeight || 1))
      );

      const heroExitThreshold = 0.25;
      const rawT = Math.min(1, Math.max(0, scrollProgress / heroExitThreshold));
      const t = rawT * (2 - rawT);

      // Camera
      const posHeroX = isMobile ? width * 0.5 : width * 0.75;
      // On mobile, push it down to where the placeholder usually sits (approx 70-75% down)
      const posHeroY = isMobile ? height * 0.75 : height * 0.5;
      const posCenterX = width * 0.5;
      const posCenterY = height * 0.5;

      const targetCenterX = posHeroX + (posCenterX - posHeroX) * t;
      const targetCenterY = posHeroY + (posCenterY - posHeroY) * t;

      currentCenterX += (targetCenterX - currentCenterX) * 0.1;
      currentCenterY += (targetCenterY - currentCenterY) * 0.1;

      // Rotation
      const targetRotX = mouseRef.current.y * 0.5;
      const targetRotY = mouseRef.current.x * 0.5;
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      const scrollDrift = scrollProgress * 0.5;
      const rotX = time * 0.1 - currentRotX;
      const rotY = time * 0.12 + currentRotY + scrollDrift;

      // Pre-calc trig
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Render
      const data = particlesDataRef.current;
      if (!data) {
        // If data lost (e.g. strict mode double invoke), try re-init or just return
        // Returning is safe as next frame might have it if we re-init in resize
        // But actually we are in animate loop.
        // Let's safe guard.
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const len = numPoints;
      const breath = 1 + Math.sin(time * 0.8) * 0.05;
      const turbulence = 2 + t * 5;
      const fov = 800;

      const drawListX: number[] = [];
      const drawListY: number[] = [];
      const drawListAlpha: number[] = [];

      for (let i = 0; i < len; i++) {
        const off = i * STRIDE;

        // 1. Interp
        const targetX = data[off + 3] + (data[off + 6] - data[off + 3]) * t;
        const targetY = data[off + 4] + (data[off + 7] - data[off + 4]) * t;
        const targetZ = data[off + 5] + (data[off + 8] - data[off + 5]) * t;

        // Update current with ease
        data[off] += (targetX - data[off]) * 0.1;
        data[off + 1] += (targetY - data[off + 1]) * 0.1;
        data[off + 2] += (targetZ - data[off + 2]) * 0.1;

        // 2. Modifiers
        let px = data[off] * breath;
        let py = data[off + 1] * breath;
        let pz = data[off + 2] * breath;

        // Noise (approximation)
        const noise = Math.sin(data[off + 3] * 0.01 + time) * turbulence;
        px += noise;
        py += noise;
        pz += noise;

        // 3. Rotation
        let tx = px * cosY - pz * sinY;
        let tz = px * sinY + pz * cosY;
        px = tx;
        pz = tz;

        let ty = py * cosX - pz * sinX;
        tz = py * sinX + pz * cosX;
        py = ty;
        pz = tz;

        // 4. Project
        if (pz > -fov + 50) {
          const scale = fov / (fov + pz);
          const x2d = px * scale + currentCenterX;
          const y2d = py * scale + currentCenterY;

          let alpha = Math.min(1, scale * 1.5);
          alpha *= 0.7 + 0.3 * Math.sin(time * 2 + i); // Twinkle

          let size = Math.max(0.5, scale * 3);
          if (t > 0.5) size = Math.max(0.4, scale * 1.8);

          // Draw Point directly
          ctx.beginPath();
          ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();

          // Collect for lines (only if visible enough)
          if (alpha > 0.2) {
            drawListX.push(x2d);
            drawListY.push(y2d);
            drawListAlpha.push(alpha);
          }
        }
      }

      // Draw Lines (Highly Optimized)
      const lineGlobalAlpha = Math.max(0, 1 - t * 1.5);
      if (lineGlobalAlpha > 0.01) {
        ctx.lineWidth = 0.5;
        const connectRange = 10;

        for (let i = 0; i < drawListX.length; i++) {
          const x1 = drawListX[i];
          const y1 = drawListY[i];

          for (let j = 1; j <= connectRange; j++) {
            if (i + j >= drawListX.length) break;

            const x2 = drawListX[i + j];
            const y2 = drawListY[i + j];

            const dx = x1 - x2;
            const dy = y1 - y2;

            if (Math.abs(dx) > 100 || Math.abs(dy) > 100) continue;

            const distSq = dx * dx + dy * dy;
            if (distSq < 3500) {
              const alpha =
                Math.min(drawListAlpha[i], drawListAlpha[i + j]) *
                (1 - distSq / 3500) *
                0.4 *
                lineGlobalAlpha;
              if (alpha > 0.05) {
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.stroke();
              }
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      isMobile = width < 768;
      numPoints = isMobile ? 300 : 800;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      baseRadius = Math.min(width, height) * 0.22;
      // Re-init particles on next frame if needed, but we must do it NOW otherwise loop fails
      // particlesDataRef.current = null; // BAD! This kills the loop logic as it was structured.
      initParticles();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[5]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default HeroVisual;
