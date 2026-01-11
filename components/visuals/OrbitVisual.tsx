"use client";

import React, { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

const OrbitVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const isInView = useInView(containerRef, { margin: "100px" });

  useEffect(() => {
    if (!isInView) {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    if (width === 0 || height === 0) {
      width = window.innerWidth;
      height = window.innerHeight; // fallback
    }

    // Optimization: Cap DPR at 2
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const lines = 40;
    const pointsPerLine = 80;
    // Recalc stepY on resize
    let stepY = height / (lines + 10);

    let time = 0;

    const animate = () => {
      time += 0.005;
      ctx.clearRect(0, 0, width, height);

      const startY = (height - lines * stepY * 0.6) / 2;
      ctx.lineWidth = 1.5;

      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        const progress = i / lines;
        const centerDist = Math.abs(progress - 0.5) * 2;
        const alpha = (1 - centerDist) * 0.8;
        ctx.strokeStyle = `rgba(220, 230, 255, ${alpha})`;

        let hasStarted = false;

        for (let j = 0; j <= pointsPerLine; j++) {
          const x = (j / pointsPerLine) * width;
          const nx = (j / pointsPerLine) * 2 - 1;

          // Inline Noise
          const noise1 = Math.sin(nx * 5 + time + i * 0.2);
          const noise2 = Math.cos(nx * 12 - time * 2 + i * 0.1);
          const amplitude = Math.exp(-3 * nx * nx) * 100;

          const yOffset =
            (noise1 + noise2 * 0.5) *
            (amplitude * (0.5 + Math.sin(time * 0.5) * 0.2));
          const y = startY + i * stepY * 0.6 - yOffset;

          if (!hasStarted) {
            ctx.moveTo(x, y);
            hasStarted = true;
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.offsetWidth || window.innerWidth;
      height = canvas.offsetHeight || window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      stepY = height / (lines + 10);
    };

    window.addEventListener("resize", handleResize);
    // Initial resize to be sure
    handleResize();

    animate();
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300px] md:h-[500px] flex items-center justify-center overflow-hidden mask-image-linear-gradient"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          width: "100%",
          height: "100%",
          maskImage:
            "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
        }}
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-[0.5em] text-white/30 uppercase">
        Frequency: 40hz // Low Band
      </div>
    </div>
  );
};

export default OrbitVisual;
