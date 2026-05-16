"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideGithub, LucideMenu } from "lucide-react";
import { WalletConnect } from "../wallet/WalletConnect";

export const Navbar = () => {
  const pathname = usePathname();
  const isApp = pathname.startsWith("/app") || pathname.startsWith("/overview") || pathname.startsWith("/circle");

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-16 bg-black/50 backdrop-blur-xl border-bottom border-white/5 px-6 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg shadow-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="1.5" strokeDasharray="2 1" />
              <circle cx="9" cy="9" r="3" fill="white" />
            </svg>
          </div>
          <span className="font-black text-white text-lg tracking-tight">SusuLink</span>
        </Link>

        {!isApp && (
          <div className="hidden md:flex items-center gap-6">
            <Link href="/explore" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Explore</Link>
            <Link href="/docs" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Docs</Link>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <a href="https://github.com/rosca-labs/susulink" target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-white transition-colors">
          <LucideGithub size={20} />
        </a>
        <WalletConnect />
        <button className="md:hidden p-2 text-gray-400 hover:text-white">
          <LucideMenu size={20} />
        </button>
      </div>
    </nav>
  );
};