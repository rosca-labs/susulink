"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { useWalletStore } from "@/store/walletStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { address } = useWalletStore();
  const router = useRouter();

  useEffect(() => {
    if (!address) {
      // For the prototype, we don't force redirect, but we could.
      // router.push("/");
    }
  }, [address, router]);

  return (
    <div className="min-h-screen bg-[#050810]">
      <Navbar />
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}
