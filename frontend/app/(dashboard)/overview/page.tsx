"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucidePlus, LucideTrendingUp, LucideUsers, LucideZap } from "lucide-react";
import Link from "next/link";
import { StatCard } from "@/components/common/StatCard";
import { CircleCard } from "@/components/circle/CircleCard";
import { Button } from "@/components/ui/Button";

const MOCK_MY_CIRCLES = [
  { id: "1", name: "Global Savers", memberCount: 10, amount: 500, status: "Active", payoutOrder: "RandomDraw", members: ["1", "2"] },
];

export default function OverviewPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening with your circles.</p>
        </div>
        <Link href="/circle/create">
          <Button variant="primary" className="flex items-center gap-2">
            <LucidePlus size={18} /> Create Circle
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <StatCard label="Total Saved" value="$2,450" icon={<LucideTrendingUp />} trend="+12%" />
        <StatCard label="Active Circles" value="3" icon={<LucideUsers />} />
        <StatCard label="Next Payout" value="8 Days" icon={<LucideZap />} />
      </div>

      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-white">Your Circles</h2>
          <Link href="/explore" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">View All</Link>
        </div>

        {MOCK_MY_CIRCLES.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_MY_CIRCLES.map((circle) => (
              <CircleCard key={circle.id} circle={circle} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
            <p className="text-gray-500 mb-6">You haven't joined any circles yet.</p>
            <Link href="/explore">
              <Button variant="secondary">Explore Circles</Button>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
