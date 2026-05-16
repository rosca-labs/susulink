"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideSearch, LucideFilter } from "lucide-react";
import { CircleCard } from "@/components/circle/CircleCard";

const MOCK_CIRCLES = [
  { id: "1", name: "Global Savers", memberCount: 10, amount: 500, status: "Forming", payoutOrder: "RandomDraw", members: ["1", "2"] },
  { id: "2", name: "Nairobi Tech Pool", memberCount: 5, amount: 1000, status: "Active", payoutOrder: "FixedQueue", members: ["1", "2", "3"] },
  { id: "3", name: "Lagos Ventures", memberCount: 8, amount: 250, status: "Forming", payoutOrder: "BidAuction", members: ["1"] },
];

export default function ExplorePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">Explore Circles</h1>
          <p className="text-gray-400">Join an existing savings circle and start building your financial future.</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <LucideSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or code..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">
            <LucideFilter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_CIRCLES.map((circle, i) => (
          <motion.div 
            key={circle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <CircleCard circle={circle} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}