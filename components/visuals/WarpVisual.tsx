"use client";

import React, { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

const WarpVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const isInView = useInView(containerRef, { margin: "100px" });

  useEffect(() => {
    if (!isInView) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = canvas.offsetWidth || window.innerWidth;
    let height = canvas.offsetHeight || window.innerHeight;

    // Optimization: Cap DPR at 2
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const numLines = 100;
    const lines = new Array(numLines).fill(null).map(() => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * 2000,
      length: 10 + Math.random() * 50,
    }));

    const animate = () => {
      // Trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const speed = 15;

      ctx.lineCap = "round";

      for (let i = 0; i < numLines; i++) {
        const line = lines[i];
        line.z -= speed;

        if (line.z <= 0) {
          line.z = 2000;
          line.x = (Math.random() - 0.5) * width * 2;
          line.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 1200 / line.z;
        const x2d = cx + line.x * k;
        const y2d = cy + line.y * k;

        // Tail
        // Optimized tail calculation
        const tailFactor = 1200 / (line.z + line.length * 5);
        // const tailX = x2d - line.x * tailFactor + cx;

        // Simpler Radial Streak
        const dx = x2d - cx;
        const dy = y2d - cy;
        const angle = Math.atan2(dy, dx);

        // Length increases with speed and closeness
        const len = line.length * k * 0.5;
        const endX = x2d + Math.cos(angle) * len;
        const endY = y2d + Math.sin(angle) * len;

        const alpha = Math.min(1, (2000 - line.z) / 1000);

        ctx.beginPath();
        ctx.moveTo(x2d, y2d);
        ctx.lineTo(endX, endY);
        ctx.lineWidth = Math.max(0.5, 2 * k);
        ctx.strokeStyle = `rgba(200, 220, 255, ${alpha})`;
        ctx.stroke();
      }

      // HUD Circle
      ctx.beginPath();
      ctx.arc(cx, cy, 50, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.offsetWidth || window.innerWidth;
      height = canvas.offsetHeight || window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isInView]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default WarpVisual;
