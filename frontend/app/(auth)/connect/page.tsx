"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LucideWallet, LucideArrowLeft, LucideShieldCheck } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ConnectPage() {
  const router = useRouter();
  const { connect } = useWallet();
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    const addr = await connect();
    setLoading(false);
    if (addr) {
      router.push("/overview");
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button 
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
        >
          <LucideArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <Card className="p-8 text-center bg-white/[0.02] border-white/10 backdrop-blur-2xl">
          <div className="w-20 h-20 bg-indigo-600/20 border border-indigo-500/30 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-500/20">
            <LucideWallet className="text-indigo-400" size={40} />
          </div>

          <h1 className="text-3xl font-black text-white mb-3">Connect Wallet</h1>
          <p className="text-gray-400 mb-10">Connect your Freighter wallet to access your SusuLink circles.</p>

          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 text-left">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <LucideShieldCheck size={20} />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Secure Access</div>
                <div className="text-xs text-gray-500">Non-custodial and trustless.</div>
              </div>
            </div>
          </div>

          <Button 
            variant="primary" 
            className="w-full py-4 text-lg shadow-xl shadow-indigo-600/20"
            onClick={handleConnect}
            disabled={loading}
          >
            {loading ? "Connecting..." : "Connect Freighter"}
          </Button>

          <p className="mt-8 text-xs text-gray-500">
            Don't have Freighter? <a href="https://www.freighter.app/" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">Download it here</a>.
          </p>
        </Card>
      </div>
    </div>
  );
}
