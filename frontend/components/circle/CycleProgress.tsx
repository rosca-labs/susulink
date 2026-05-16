"use client";
import React from "react";
export const CycleProgress = ({ current, total }: { current: number, total: number }) => {
  const percentage = (current / total) * 100;
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <span className="text-3xl font-bold text-white">Cycle {current}</span>
          <span className="text-gray-500 ml-2">of {total}</span>
        </div>
        <span className="text-sm font-medium text-indigo-400">{Math.round(percentage)}% Complete</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-gray-600">
        <span>Start</span>
        <span>Maturity</span>
      </div>
    </div>
  );
};
