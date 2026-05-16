"use client";

import React from "react";
import Link from "next/link";
import { LucideUsers, LucideArrowRight, LucideShieldCheck } from "lucide-react";
import { Card } from "../ui/Card";
import { ProgressRing } from "../ui/Progress";

interface CircleCardProps {
  circle: {
    id: string;
    name: string;
    memberCount: number;
    amount: number;
    status: string;
    payoutOrder: string;
    members: string[];
  };
}

export const CircleCard = ({ circle }: CircleCardProps) => {
  const progress = (circle.members?.length / circle.memberCount) * 100 || 0;

  return (
    <Card className="group hover:border-indigo-500/50 transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <ProgressRing percentage={progress} size={48} strokeWidth={4} />
        <span className="text-[10px] uppercase font-black px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          {circle.status}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
        {circle.name}
      </h3>
      
      <div className="flex items-center gap-4 text-gray-500 text-xs mb-6">
        <span className="flex items-center gap-1">
          <LucideUsers size={12} /> {circle.memberCount}
        </span>
        <span className="flex items-center gap-1">
          <LucideShieldCheck size={12} /> {circle.payoutOrder}
        </span>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <div className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">Pool Amount</div>
          <div className="text-2xl font-black text-white">${circle.amount}</div>
        </div>
        
        <Link href={`/circle/${circle.id}`} className="p-3 bg-white/5 group-hover:bg-indigo-600 rounded-xl text-gray-400 group-hover:text-white transition-all">
          <LucideArrowRight size={20} />
        </Link>
      </div>
    </Card>
  );
};