"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import OrbitVisual from "../visuals/OrbitVisual";

const RippleSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="py-32 relative overflow-hidden flex flex-col items-center justify-center min-h-[80vh]"
    >
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.div style={{ opacity }} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6">
            Signal <span className="text-white/30">Interference</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">
            In the absence of matter, waves propagate through nothingness. These
            are the heartbeats of a dead star, translated into visual
            frequencies.
          </p>
        </motion.div>

        <motion.div style={{ opacity }} className="w-full relative">
          <OrbitVisual />
        </motion.div>

        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-16 text-center border-t border-white/10 pt-8">
          <div>
            <div className="text-lg font-mono">0.00Hz</div>
            <div className="text-[9px] text-white/30 uppercase tracking-widest">
              Frequency
            </div>
          </div>
          <div>
            <div className="text-lg font-mono">NULL</div>
            <div className="text-[9px] text-white/30 uppercase tracking-widest">
              Origin
            </div>
          </div>
          <div>
            <div className="text-lg font-mono">∞</div>
            <div className="text-[9px] text-white/30 uppercase tracking-widest">
              Duration
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RippleSection;
