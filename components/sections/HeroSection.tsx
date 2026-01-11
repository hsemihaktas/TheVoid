"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);
  const yTextSmooth = useSpring(yText, { stiffness: 100, damping: 20 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 lg:px-12 pt-20"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10 mx-auto">
        <motion.div
          style={{ y: yTextSmooth, opacity: opacityText }}
          className="flex flex-col items-start text-left"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 mb-8 border-l border-white/30 pl-4"
          >
            <span className="text-[10px] font-mono text-white/60 tracking-[0.3em] uppercase">
              Sector 001
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter text-white leading-[0.85] mb-8"
          >
            THE <br />
            <span className="text-white/30 font-light">VOID</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg text-white/50 max-w-md leading-relaxed mb-12 font-light"
          >
            Beyond the event horizon, logic dissolves. Welcome to the null space
            where data becomes silence and silence becomes infinite.
          </motion.p>
        </motion.div>

        {/* Visual Placeholder */}
        <div className="block h-[300px] lg:h-[600px]"></div>
      </div>

      <motion.div
        style={{ opacity: opacityText }}
        className="absolute bottom-8 right-6 lg:right-12 flex flex-col items-end gap-2 text-white/30"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">
          Null Signal
        </span>
        <div className="w-24 h-[1px] bg-white/20"></div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
