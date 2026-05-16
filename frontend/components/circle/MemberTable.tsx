"use client";
import React from "react";
import { Card } from "../ui/Card";
interface Member {
  address: string;
  status: "contributed" | "pending" | "late";
  position: number;
}
export const MemberTable = ({ members }: { members: Member[] }) => {
  return (
    <Card className="p-0 overflow-hidden border-white/5 bg-white/[0.01]">
      <table className="w-full text-left">
        <thead className="bg-white/5 text-xs text-gray-500 uppercase tracking-wider">
          <tr>
            <th className="px-6 py-4 font-semibold">Member Address</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold text-right">Payout Position</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {members.map((member, i) => (
            <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
              <td className="px-6 py-4">
                <span className="font-mono text-sm text-indigo-300 group-hover:text-indigo-200 transition-colors">
                  {member.address.slice(0, 6)}...{member.address.slice(-6)}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                  member.status === "contributed" 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : member.status === "late"
                    ? "bg-red-500/10 text-red-400 border-red-500/20"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                }`}>
                  {member.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-white font-medium">#{member.position}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
