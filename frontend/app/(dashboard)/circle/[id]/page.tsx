"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LucideArrowLeft, LucideUsers, LucideCalendar, LucideShield, LucideArrowUpRight, LucideInfo } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { toast } from "react-hot-toast";
import { MemberTable } from "@/components/circle/MemberTable";
import { CycleProgress } from "@/components/circle/CycleProgress";

export default function CircleDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [contributing, setContributing] = useState(false);

  // Mock data
  const activeCircle = {
    id: id as string,
    name: "Global Savers",
    memberCount: 10,
    contributionAmount: 500,
    frequencyDays: 30,
    payoutOrder: "RandomDraw",
    contractId: "CD...FLA5",
    inviteCode: "ABCDEF",
    penaltyRateBps: 500,
  };

  const members = [
    { address: "GBBD...FLA5", status: "contributed" as const, position: 1 },
    { address: "GCCC...XYZ1", status: "pending" as const, position: 2 },
  ];

  const handleContribute = async () => {
    setContributing(true);
    setTimeout(() => {
      toast.success("Contribution successful!");
      setContributing(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
      >
        <LucideArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-black text-white mb-2">{activeCircle.name}</h1>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <span className="flex items-center gap-1.5"><LucideUsers size={14} /> {activeCircle.memberCount} Members</span>
                  <span className="flex items-center gap-1.5"><LucideCalendar size={14} /> Every {activeCircle.frequencyDays} Days</span>
                  <span className="flex items-center gap-1.5 text-indigo-400"><LucideShield size={14} /> {activeCircle.payoutOrder}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-indigo-400">${activeCircle.contributionAmount}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Per Cycle</div>
              </div>
            </div>

            <Card className="p-8 bg-indigo-600/5 border-indigo-500/10">
              <CycleProgress current={1} total={activeCircle.memberCount} />
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-6">Circle Members</h2>
            <MemberTable members={members} />
          </section>
        </div>

        <div className="space-y-6">
          <Card className="bg-indigo-600/5 border-indigo-500/20 p-6">
            <h3 className="text-lg font-bold text-white mb-6">Your Contribution</h3>
            <div className="space-y-4 mb-8">
              <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Due Date</div>
                <div className="text-white font-medium">May 24, 2026</div>
              </div>
              <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Amount Due</div>
                <div className="text-white font-medium">{activeCircle.contributionAmount} USDC</div>
              </div>
            </div>
            <Button 
              variant="primary" 
              className="w-full py-4 text-lg"
              onClick={handleContribute}
              disabled={contributing}
            >
              {contributing ? "Processing..." : "Pay Contribution"}
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">On-Chain Info</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Contract ID</span>
                <span className="text-indigo-300 font-mono text-xs">{activeCircle.contractId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Invite Code</span>
                <span className="text-white font-mono">{activeCircle.inviteCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Penalty Rate</span>
                <span className="text-red-400 font-bold">{activeCircle.penaltyRateBps / 100}%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
