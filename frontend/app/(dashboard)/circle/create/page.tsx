"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LucideArrowLeft, LucideUsers, LucideDollarSign, LucideCalendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { toast } from "react-hot-toast";

export default function CreateCirclePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    memberCount: 6,
    amount: 100,
    frequencyDays: 30,
    payoutOrder: "FixedQueue",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      toast.success("Circle created successfully!");
      router.push("/overview");
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <LucideArrowLeft size={18} />
        Back
      </button>

      <h1 className="text-4xl font-bold text-white mb-2">Create Savings Circle</h1>
      <p className="text-gray-400 mb-12">Set up your circle parameters and invite members to start saving.</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Circle Name</label>
            <input
              type="text"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Lagos Tech Savings"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <LucideUsers size={14} /> Member Count
              </label>
              <input
                type="number"
                min="2"
                max="20"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.memberCount}
                onChange={(e) => setFormData({ ...formData, memberCount: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <LucideDollarSign size={14} /> Amount (USDC)
              </label>
              <input
                type="number"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
              <LucideCalendar size={14} /> Payout Frequency (Days)
            </label>
            <select 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.frequencyDays}
              onChange={(e) => setFormData({ ...formData, frequencyDays: parseInt(e.target.value) })}
            >
              <option value="7">Every Week</option>
              <option value="14">Every 2 Weeks</option>
              <option value="30">Every Month</option>
            </select>
          </div>
        </Card>

        <div className="flex gap-4">
          <Button variant="secondary" className="flex-1" type="button" onClick={() => router.back()}>Cancel</Button>
          <Button variant="primary" className="flex-1" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Circle"}
          </Button>
        </div>
      </form>
    </div>
  );
}