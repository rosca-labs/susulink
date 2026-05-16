"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LucideArrowRight, LucideShieldCheck, LucideZap,
  LucideGlobe2, LucideWallet, LucideGithub,
} from "lucide-react";

/* ── Pure CSS Rotating Ring ── */
function SavingsRing() {
  const members = [
    { label: "Ada", color: "#6366f1", delay: "0s" },
    { label: "Bola", color: "#8b5cf6", delay: "1.2s" },
    { label: "Chen", color: "#06b6d4", delay: "2.4s" },
    { label: "Dami", color: "#10b981", delay: "3.6s" },
    { label: "Eze", color: "#f59e0b", delay: "4.8s" },
    { label: "Fifi", color: "#ec4899", delay: "6s" },
  ];

  return (
    <div className="relative w-[380px] h-[380px] mx-auto flex items-center justify-center">
      {/* Glow */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        filter: "blur(20px)",
      }} />

      {/* Ring 1 — slow outer */}
      <div style={{
        position: "absolute", width: 340, height: 340,
        borderRadius: "50%",
        border: "1px dashed rgba(99,102,241,0.25)",
        animation: "ringRotate 24s linear infinite",
      }}>
        {members.map((m, i) => {
          const angle = (360 / members.length) * i - 90;
          const rad = (angle * Math.PI) / 180;
          const x = 50 + 50 * Math.cos(rad);
          const y = 50 + 50 * Math.sin(rad);
          return (
            <div key={m.label} style={{
              position: "absolute",
              left: `calc(${x}% - 18px)`,
              top: `calc(${y}% - 18px)`,
              animation: `ringRotate 24s linear infinite reverse`,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: `${m.color}22`,
                border: `2px solid ${m.color}66`,
                boxShadow: `0 0 12px ${m.color}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, color: m.color,
              }}>{m.label[0]}</div>
            </div>
          );
        })}
      </div>

      {/* Ring 2 — mid */}
      <div style={{
        position: "absolute", width: 220, height: 220,
        borderRadius: "50%",
        border: "1px solid rgba(139,92,246,0.15)",
        animation: "ringRotate 16s linear infinite reverse",
      }} />

      {/* Ring 3 — inner */}
      <div style={{
        position: "absolute", width: 120, height: 120,
        borderRadius: "50%",
        border: "1px dashed rgba(6,182,212,0.2)",
        animation: "ringRotate 10s linear infinite",
      }} />

      {/* Center Core */}
      <div style={{
        position: "relative", zIndex: 10,
        width: 80, height: 80, borderRadius: "50%",
        background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2))",
        border: "1px solid rgba(99,102,241,0.5)",
        boxShadow: "0 0 30px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 2,
      }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="11" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="14" cy="14" r="6" fill="rgba(99,102,241,0.3)" />
          <circle cx="14" cy="14" r="2.5" fill="#818cf8" />
        </svg>
        <span style={{ fontSize: 8, color: "#818cf8", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>Pool</span>
      </div>

      <style>{`
        @keyframes ringRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/* ── Marquee Ticker ── */
function Ticker() {
  const items = ["Non-Custodial", "Stellar Network", "USDC Payouts", "Soroban Contracts", "Open Source", "Instant Payouts", "Global Access", "SEP-10 Auth"];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "12px 0", background: "rgba(255,255,255,0.01)" }}>
      <div style={{ display: "flex", gap: 48, animation: "ticker 20s linear infinite", width: "max-content" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{ fontSize: 12, color: "#4a5568", fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", whiteSpace: "nowrap" }}>
            <span style={{ color: "#6366f1", marginRight: 12 }}>✦</span>{item}
          </span>
        ))}
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export default function Home() {
  return (
    <div style={{ background: "#030712", color: "#f9fafb", minHeight: "100vh", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 64,
        background: "rgba(3,7,18,0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 16px rgba(99,102,241,0.4)",
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="1.5" strokeDasharray="2.5 1.5" />
              <circle cx="9" cy="9" r="3.5" fill="white" fillOpacity="0.9" />
              <circle cx="9" cy="4" r="1.2" fill="white" />
              <circle cx="9" cy="14" r="1.2" fill="white" />
              <circle cx="4" cy="9" r="1.2" fill="white" />
              <circle cx="14" cy="9" r="1.2" fill="white" />
            </svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: -0.5 }}>SusuLink</span>
        </div>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Explore", "Dashboard", "Docs"].map(l => (
            <Link key={l} href={`/${l.toLowerCase()}`} style={{ color: "#6b7280", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "#6b7280")}>
              {l}
            </Link>
          ))}
          <a href="https://github.com/rosca-labs/susulink" target="_blank" rel="noopener noreferrer" style={{ color: "#6b7280", display: "flex" }}>
            <LucideGithub size={18} />
          </a>
          <Link href="/app">
            <button style={{
              padding: "8px 20px", borderRadius: 12, fontSize: 14, fontWeight: 600,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff", border: "none", cursor: "pointer",
              boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
              transition: "transform .2s, box-shadow .2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              Launch App
            </button>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 140, paddingBottom: 80, maxWidth: 1200, margin: "0 auto", padding: "140px 40px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

          {/* LEFT */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.6 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 14px", borderRadius: 100,
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.25)",
              fontSize: 11, fontWeight: 700, color: "#818cf8",
              letterSpacing: 2, textTransform: "uppercase" as const,
              marginBottom: 28,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: "#6366f1", animation: "pulse 2s infinite" }} />
              Stellar Network · Soroban
            </div>

            <h1 style={{
              fontSize: "clamp(42px, 5vw, 72px)",
              fontWeight: 900, lineHeight: 1.05,
              letterSpacing: -2, marginBottom: 24,
              fontFamily: "system-ui, sans-serif",
            }}>
              Savings Circles<br />
              <span style={{
                background: "linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #38bdf8 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Built for Web3</span>
            </h1>

            <p style={{ fontSize: 18, color: "#9ca3af", lineHeight: 1.7, maxWidth: 480, marginBottom: 40 }}>
              Join trustless group savings with automatic payouts. Powered by Soroban smart contracts and USDC — no middlemen, no borders.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" as const, marginBottom: 48 }}>
              <Link href="/app">
                <button style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "14px 28px", borderRadius: 14, fontSize: 15, fontWeight: 700,
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#fff", border: "none", cursor: "pointer",
                  boxShadow: "0 8px 32px rgba(99,102,241,0.4)",
                  transition: "transform .2s, box-shadow .2s",
                }}>
                  <LucideWallet size={18} /> Start Saving
                </button>
              </Link>
              <Link href="/explore">
                <button style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "14px 28px", borderRadius: 14, fontSize: 15, fontWeight: 700,
                  background: "rgba(255,255,255,0.04)",
                  color: "#d1d5db", border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer",
                  transition: "all .2s",
                }}>
                  Browse Circles <LucideArrowRight size={16} />
                </button>
              </Link>
            </div>

            {/* Social Proof */}
            <div style={{ display: "flex", gap: 32, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {[["$4.2M+", "Total Saved"], ["1,200+", "Active Circles"], ["8,500+", "Members"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>{v}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Ring */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <SavingsRing />
          </motion.div>
        </div>
      </section>

      {/* TICKER */}
      <Ticker />

      {/* FEATURES */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 40px" }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.5, marginBottom: 16 }}>
            Why <span style={{ background: "linear-gradient(135deg, #818cf8, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SusuLink</span>?
          </h2>
          <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 520, margin: "0 auto" }}>
            Traditional group savings, reimagined for the blockchain era.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {[
            { icon: <LucideShieldCheck size={24} />, color: "#6366f1", title: "Trustless by Design", desc: "Smart contracts hold and disburse funds automatically. No human can interfere with your savings." },
            { icon: <LucideZap size={24} />, color: "#f59e0b", title: "Instant USDC Payouts", desc: "When your rotation arrives, the full pool lands in your wallet in seconds — not days." },
            { icon: <LucideGlobe2 size={24} />, color: "#06b6d4", title: "Save Across Borders", desc: "Invite anyone with a Stellar wallet. Currencies and borders don't exist in your circle." },
            { icon: <LucideShieldCheck size={24} />, color: "#10b981", title: "Penalty Protection", desc: "Late contributions trigger automatic penalties, protecting on-time members fairly." },
            { icon: <LucideWallet size={24} />, color: "#8b5cf6", title: "Freighter Native", desc: "Sign transactions directly from your Freighter wallet. No seed phrases stored anywhere." },
            { icon: <LucideGithub size={24} />, color: "#ec4899", title: "Open Source", desc: "Every line of code is public. Audit the contracts, fork the frontend, contribute to the protocol." },
          ].map((f) => (
            <motion.div key={f.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              whileHover={{ y: -6, borderColor: `${f.color}33` } as any}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 24, padding: 32,
                transition: "all .3s",
                cursor: "default",
              }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14, marginBottom: 20,
                background: `${f.color}18`, border: `1px solid ${f.color}33`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: f.color,
              }}>{f.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: "#f9fafb" }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "100px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -1.5, marginBottom: 16 }}>Three Steps. <span style={{ background: "linear-gradient(135deg, #818cf8, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>That's It.</span></h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            {[
              { n: "01", title: "Create or Join", desc: "Set up a savings circle with your parameters, or join one with a 6-digit invite code.", color: "#6366f1", accentBg: "rgba(99,102,241,0.06)", accentBorder: "rgba(99,102,241,0.18)" },
              { n: "02", title: "Contribute Each Cycle", desc: "Every member deposits USDC. The Soroban vault holds funds securely until payout.", color: "#8b5cf6", accentBg: "rgba(139,92,246,0.06)", accentBorder: "rgba(139,92,246,0.18)" },
              { n: "03", title: "Receive Your Payout", desc: "When your rotation arrives, the entire pool is automatically sent to your wallet.", color: "#06b6d4", accentBg: "rgba(6,182,212,0.06)", accentBorder: "rgba(6,182,212,0.18)" },
            ].map((s) => (
              <motion.div key={s.n} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                style={{ background: s.accentBg, border: `1px solid ${s.accentBorder}`, borderRadius: 24, padding: 36, position: "relative", overflow: "hidden" }}>
                <div style={{ fontSize: 96, fontWeight: 900, color: `${s.color}10`, position: "absolute", top: -16, right: 12, lineHeight: 1, userSelect: "none", fontFamily: "system-ui" }}>{s.n}</div>
                <div style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 36, height: 36, borderRadius: 10,
                  background: `${s.color}20`, border: `1px solid ${s.color}40`,
                  fontSize: 13, fontWeight: 800, color: s.color,
                  marginBottom: 20,
                }}>{s.n}</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "#f9fafb", marginBottom: 12 }}>{s.title}</h3>
                <p style={{ fontSize: 15, color: "#9ca3af", lineHeight: 1.7 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "100px 40px" }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.06))",
            border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: 32, padding: "64px 40px", textAlign: "center",
            boxShadow: "0 0 80px rgba(99,102,241,0.08)",
          }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 100, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", fontSize: 11, fontWeight: 700, color: "#818cf8", letterSpacing: 2, textTransform: "uppercase", marginBottom: 24 }}>
            🌊 Stellar Wave Program
          </div>
          <h2 style={{ fontSize: 52, fontWeight: 900, letterSpacing: -1.5, marginBottom: 20 }}>
            Ready to save<br />
            <span style={{ background: "linear-gradient(135deg, #818cf8, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>together?</span>
          </h2>
          <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 480, margin: "0 auto 40px" }}>
            SusuLink is open source and part of the Stellar Wave program. Contribute, earn rewards, build the future of savings.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/app">
              <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 32px", borderRadius: 14, fontSize: 16, fontWeight: 700, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 8px 32px rgba(99,102,241,0.4)" }}>
                <LucideWallet size={18} /> Launch App
              </button>
            </Link>
            <a href="https://github.com/rosca-labs/susulink" target="_blank" rel="noopener noreferrer">
              <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 32px", borderRadius: 14, fontSize: 16, fontWeight: 700, background: "rgba(255,255,255,0.04)", color: "#d1d5db", border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer" }}>
                <LucideGithub size={18} /> GitHub
              </button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.2" strokeDasharray="2 1" /><circle cx="7" cy="7" r="2.5" fill="white" /><circle cx="7" cy="2.5" r="0.8" fill="white" /><circle cx="7" cy="11.5" r="0.8" fill="white" /><circle cx="2.5" cy="7" r="0.8" fill="white" /><circle cx="11.5" cy="7" r="0.8" fill="white" /></svg>
            </div>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#9ca3af" }}>SusuLink</span>
          </div>
          <p style={{ fontSize: 12, color: "#374151" }}>© 2026 SusuLink · Built for the Stellar Wave Program · MIT License</p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Explore", "Dashboard", "GitHub"].map(l => (
              <a key={l} href={l === "GitHub" ? "https://github.com/rosca-labs/susulink" : `/${l.toLowerCase()}`}
                style={{ fontSize: 12, color: "#374151", textDecoration: "none" }}
                target={l === "GitHub" ? "_blank" : undefined}>{l}</a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          nav { padding: 0 20px !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>
    </div>
  );
}