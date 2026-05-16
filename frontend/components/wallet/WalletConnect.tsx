"use client";
import React from "react";
import { LucideWallet, LucideLogOut } from "lucide-react";
import { useWalletStore } from "@/store/walletStore";
import { freighter } from "@/lib/freighter";
import { toast } from "react-hot-toast";
export const WalletConnect = () => {
  const { address, setAddress } = useWalletStore();
  const handleConnect = async () => {
    try {
      const { address: addrStr } = await freighter.connect();
      setAddress(addrStr);
      toast.success("Wallet connected!");
    } catch (err: any) {
      toast.error(err.message || "Failed to connect wallet");
    }
  };
  const handleDisconnect = () => {
    setAddress(null);
    toast.success("Wallet disconnected");
  };
  if (address) {
    return (
      <div className="flex items-center gap-3">
        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-sm text-gray-300">
            {address.slice(0, 4)}...{address.slice(-4)}
          </span>
        </div>
        <button 
          onClick={handleDisconnect}
          className="p-2.5 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 rounded-xl text-gray-400 hover:text-red-400 transition-all"
          title="Disconnect"
        >
          <LucideLogOut size={18} />
        </button>
      </div>
    );
  }
  return (
    <button 
      onClick={handleConnect}
      className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
    >
      <LucideWallet size={18} />
      <span>Connect Wallet</span>
    </button>
  );
};
