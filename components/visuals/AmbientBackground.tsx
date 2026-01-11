"use client";

import React from "react";
import { motion } from "framer-motion";

const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black">
      {/* Cinematic Grain Overlay - Adds texture to the void */}
      <div
        className="absolute inset-0 opacity-[0.07] z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Deep Space Glows - Much darker now */}
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-indigo-950/20 blur-[150px]"
      />

      <motion.div
        animate={{
          opacity: [0.05, 0.15, 0.05],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 5,
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-slate-900/20 blur-[180px]"
      />
    </div>
  );
};

export default AmbientBackground;
