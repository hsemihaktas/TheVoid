"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Infinity as InfinityIcon } from "lucide-react";
import WarpVisual from "../visuals/WarpVisual";

const DepthSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.3, 0.7], [0.8, 1.2]);
  const opacity = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.8, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={ref}
      className="h-[150vh] relative flex items-center justify-center overflow-hidden"
    >
      {/* Background Warp Tunnel */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen">
        <WarpVisual />
      </div>

      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
      >
        <div className="mb-8">
          <InfinityIcon
            size={48}
            className="mx-auto text-white/80 mb-4"
            strokeWidth={1}
          />
        </div>

        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-black">
          TIME DILATION
        </h2>

        <p className="text-xl md:text-2xl text-white/60 font-light max-w-3xl mx-auto">
          As velocity increases, time slows. We are currently passing through a
          region where seconds stretch into centuries.
        </p>
      </motion.div>
    </section>
  );
};

export default DepthSection;
