"use client";

import React, { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

type VisualMode = "bootes" | "quantum" | "coldspot";

interface CosmicVisualProps {
  mode: VisualMode;
}

const CosmicVisual: React.FC<CosmicVisualProps> = ({ mode }) => {
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

    let width = canvas.offsetWidth || window.innerWidth;
    let height = canvas.offsetHeight || window.innerHeight;

    // Optimization: Cap DPR at 2
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let time = 0;

    let particles: any[] = [];
    let gridSize = 15;

    // --- INITIALIZERS ---
    const initBootes = () => {
      particles = [];
      const count = 400;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 60 + Math.random() * width * 0.6;
        particles.push({
          x: width / 2 + Math.cos(angle) * dist,
          y: height / 2 + Math.sin(angle) * dist,
          angle: angle,
          speed: 0.1 + Math.random() * 0.3,
          size: Math.random() * 1.5,
          brightness: Math.random(),
        });
      }
    };

    const initQuantum = () => {
      particles = [];
      gridSize = 14;
      const cols = Math.ceil(width / gridSize);
      const rows = Math.ceil(height / gridSize);

      for (let i = 0; i < cols * rows; i++) {
        particles.push({
          x: (i % cols) * gridSize,
          y: Math.floor(i / cols) * gridSize,
          life: 0,
          maxLife: 0,
          colorType: 0,
        });
      }
    };

    const initColdSpot = () => {
      particles = [];
      const count = 600;
      for (let i = 0; i < count; i++) {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;

        const r = 100;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        const temp = Math.random(); // Simplified for init, visual calc in loop
        particles.push({ x, y, z, ox: x, oy: y, oz: z, temp }); // Store original pos
      }
    };

    // Initial setup
    if (mode === "bootes") initBootes();
    if (mode === "quantum") initQuantum();
    if (mode === "coldspot") initColdSpot();

    const animate = () => {
      time += 0.01;
      const cx = width / 2;
      const cy = height / 2;

      // CLEAR
      if (mode === "quantum") {
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      // RENDER BOOTES
      if (mode === "bootes") {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - cx;
          const dy = p.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const force = Math.max(0, (200 - dist) / 1000);

          p.x += Math.cos(p.angle) * (p.speed + force);
          p.y += Math.sin(p.angle) * (p.speed + force);

          // Wrap logic needs width/height
          if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
            const newAngle = Math.random() * Math.PI * 2;
            const r = 50 + Math.random() * 40;
            p.x = cx + Math.cos(newAngle) * r;
            p.y = cy + Math.sin(newAngle) * r;
            p.angle = Math.atan2(p.y - cy, p.x - cx);
          }

          ctx.globalAlpha = p.brightness * (dist > 80 ? 1 : dist / 80);
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      // RENDER QUANTUM
      else if (mode === "quantum") {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (p.life <= 0) {
            if (Math.random() > 0.98) {
              p.life = 5 + Math.random() * 15;
              p.maxLife = p.life;
              p.colorType = Math.random() > 0.5 ? 1 : 2;
            }
          } else {
            p.life--;
          }

          if (p.life > 0) {
            const opacity = p.life / p.maxLife;
            const size = gridSize * 0.9 * opacity;
            ctx.fillStyle =
              p.colorType === 1
                ? `rgba(0, 243, 255, ${opacity})`
                : `rgba(255, 0, 85, ${opacity})`;
            ctx.fillRect(p.x, p.y, size, size);
          }
        }
      }
      // RENDER COLDSPOT
      else if (mode === "coldspot") {
        const rx = time * 0.2;
        const ry = time * 0.3;
        const cosRx = Math.cos(rx),
          sinRx = Math.sin(rx);
        const cosRy = Math.cos(ry),
          sinRy = Math.sin(ry);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const tx = p.ox * cosRy - p.oz * sinRy;
          const tz1 = p.ox * sinRy + p.oz * cosRy;
          const ty = p.oy * cosRx - tz1 * sinRx;
          const tz = p.oy * sinRx + tz1 * cosRx;

          const fov = 250;
          const scale = fov / (fov + tz);
          const px = cx + tx * scale;
          const py = cy + ty * scale;
          const size = 1.8 * scale;

          let r, g, b;
          if (p.temp < 0.3) {
            // Use fixed temp for color stability or random per frame? Fixed in init is better but simple random here for glitter
            // actually we are not storing temp, wait we are.
            // Using logic from init:
            // distToSpot check was in init. Let's assume p.temp holds color factor
            // Re-implementing logic based on p.temp stored in init
            if (p.temp < 0.3) {
              // arbitrary threshold based on init logic
              r = 5;
              g = 10;
              b = 140; // blueish
            } else {
              r = 255;
              g = 200;
              b = 50; // yellowish
            }
          } else {
            r = 255;
            g = 255;
            b = 255; // fallback
          }
          // Simplified color logic based on previous file context
          // Actually, let's look at previous file:
          // if (p.temp < 0.3) { r=5, g=10, b=40 + p.temp*100 } else { r=255, g=100+p.temp*100, b=50 }

          if (p.temp < 0.3) {
            r = 5;
            g = 10;
            b = 40 + p.temp * 100;
          } else {
            r = 255;
            g = 100 + p.temp * 100;
            b = 50;
          }

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${scale})`;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
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

      // Re-init particles to fit new screen
      if (mode === "bootes") initBootes();
      if (mode === "quantum") initQuantum();
      // coldspot is 3d centered so maybe doesn't need re-init, but safer to do so
      if (mode === "coldspot") initColdSpot();
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [mode, isInView]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default CosmicVisual;
