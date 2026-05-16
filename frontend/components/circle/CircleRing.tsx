"use client";
import React from "react";
import { motion } from "framer-motion";
export const CircleRing = () => {
  const members = Array.from({ length: 8 }, (_, i) => i);
  const radius = 120;
  const centerX = 200;
  const centerY = 200;
  return (
    <div className="relative w-[400px] h-[400px] flex items-center justify-center">
      <div className="absolute inset-0 bg-indigo-500/5 blur-[100px] rounded-full" />
      <div className="absolute w-[320px] h-[320px] border border-white/5 rounded-full" />
      <div className="absolute w-[240px] h-[240px] border border-white/10 rounded-full animate-[spin_20s_linear_infinite]" />
      <div className="relative z-10 w-24 h-24 rounded-full bg-indigo-600/20 border border-indigo-500/50 flex items-center justify-center backdrop-blur-xl">
        <div className="w-12 h-12 rounded-full bg-indigo-500/30 animate-pulse" />
      </div>
      <div className="absolute inset-0 animate-[spin_30s_linear_infinite]">
        {members.map((i) => {
          const angle = (i * 360) / members.length;
          const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
          const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
          return (
            <motion.div
              key={i}
              className="absolute w-10 h-10 -ml-5 -mt-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden backdrop-blur-md"
              style={{ left: x, top: y }}
            >
              <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
