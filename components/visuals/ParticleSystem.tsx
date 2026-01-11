"use client";

import React, { useRef, useEffect } from "react";

const ParticleSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // [x, y, vx, vy, size, alpha]
  const STRIDE = 6;
  const particlesRef = useRef<Float32Array>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Optimization: Cap DPR at 2
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      initParticles(width, height);
    };

    const initParticles = (width: number, height: number) => {
      const isMobile = width < 768;
      const baseCount = isMobile ? 40 : 100;
      const count = Math.min(Math.floor(width * 0.05), baseCount);

      particlesRef.current = new Float32Array(count * STRIDE);
      const data = particlesRef.current;

      for (let i = 0; i < count; i++) {
        const i6 = i * STRIDE;
        data[i6] = Math.random() * width; // x
        data[i6 + 1] = Math.random() * height; // y
        data[i6 + 2] = (Math.random() - 0.5) * 0.1; // vx
        data[i6 + 3] = (Math.random() - 0.5) * 0.1; // vy
        data[i6 + 4] = Math.random() * 2; // size
        data[i6 + 5] = Math.random() * 0.3 + 0.1; // alpha
      }
    };

    const animate = () => {
      if (!canvas || !ctx) return;
      // Note: Canvas dimensions are dpr scaled, but CSS/style logic is logical pixels.
      // We need logical width/height for boundary checks if we scaled the context.
      const width = canvas.width / Math.min(window.devicePixelRatio || 1, 2);
      const height = canvas.height / Math.min(window.devicePixelRatio || 1, 2);

      ctx.clearRect(0, 0, width, height);

      const data = particlesRef.current;
      if (!data) return;

      const len = data.length / STRIDE;

      ctx.fillStyle = "#fff"; // Set once if possible, but alpha changes per particle

      for (let i = 0; i < len; i++) {
        const i6 = i * STRIDE;
        // Update
        data[i6] += data[i6 + 2];
        data[i6 + 1] += data[i6 + 3];

        // Bounds
        if (data[i6] < 0) data[i6] = width;
        else if (data[i6] > width) data[i6] = 0;

        if (data[i6 + 1] < 0) data[i6 + 1] = height;
        else if (data[i6 + 1] > height) data[i6 + 1] = 0;

        // Draw
        // Optimization: Small circles, maybe fillRect is faster?
        // Arc is nicer, stick with arc for quality, but Float32Array helps memory.
        ctx.globalAlpha = data[i6 + 5];
        ctx.beginPath();
        ctx.arc(data[i6], data[i6 + 1], data[i6 + 4], 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[6]"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default ParticleSystem;
