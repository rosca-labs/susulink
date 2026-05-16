"use client";

import React from "react";
import { Card } from "../ui/Card";

export const StatCard = ({ label, value, icon, trend }: { label: string, value: string | number, icon: React.ReactNode, trend?: string }) => {
  return (
    <Card className="flex items-center gap-6 p-6 group hover:border-indigo-500/30 transition-all">
      <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">{label}</div>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-black text-white">{value}</div>
          {trend && (
            <span className="text-xs font-bold text-emerald-400">{trend}</span>
          )}
        </div>
      </div>
    </Card>
  );
};