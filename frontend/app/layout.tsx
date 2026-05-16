import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SusuLink | Decentralized ROSCA on Stellar",
  description: "Trustless rotating savings circles built on Stellar & Soroban. Join the decentralized ROSCA revolution.",
  keywords: ["ROSCA", "Stellar", "DeFi", "savings", "Soroban", "USDC"],
  openGraph: {
    title: "SusuLink — Savings Circles Reimagined",
    description: "Trustless, transparent, global rotating savings on Stellar.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}