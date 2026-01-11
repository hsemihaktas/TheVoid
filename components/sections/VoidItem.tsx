"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import CosmicVisual from "../visuals/CosmicVisual";

type VisualMode = "bootes" | "quantum" | "coldspot";

interface VoidItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
  subtitle: string;
  visualMode: VisualMode;
  visualLabel: string;
  visualLabelColor?: string;
  reverse?: boolean; // If true, visual is on the right
}

const VoidItem: React.FC<VoidItemProps> = ({
  title,
  description,
  icon: Icon,
  subtitle,
  visualMode,
  visualLabel,
  visualLabelColor = "text-white/40",
  reverse = false,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Visual Column */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className={`relative h-[300px] border border-white/5 rounded-lg overflow-hidden ${
          reverse ? "order-1 md:order-2" : "order-2 md:order-1"
        }`}
      >
        <CosmicVisual mode={visualMode} />
        <div
          className={`absolute ${
            reverse ? "bottom-2 right-2" : "bottom-6 left-1/2 -translate-x-1/2"
          } 
            text-[10px] font-mono tracking-[0.2em] uppercase ${visualLabelColor}`}
        >
          {visualLabel}
        </div>
      </motion.div>

      {/* Text Column */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className={`space-y-6 ${
          reverse ? "order-2 md:order-1" : "order-1 md:order-2"
        }`}
      >
        <div className="flex items-center gap-3 text-white/40 mb-2">
          <Icon size={16} />
          <span className="text-xs font-mono uppercase tracking-widest">
            {subtitle}
          </span>
        </div>
        <h3 className="text-4xl md:text-6xl font-light tracking-tighter">
          {title}
        </h3>
        <p className="text-white/60 text-lg leading-relaxed">{description}</p>
      </motion.div>
    </div>
  );
};

export default VoidItem;
