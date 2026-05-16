"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { LucideTrophy } from "lucide-react";

export const PayoutCelebration = ({ isOpen, amount, onClose }: { isOpen: boolean, amount: number, onClose: () => void }) => {
  useEffect(() => {
    if (isOpen) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="max-w-md w-full bg-indigo-600 rounded-3xl p-8 text-center shadow-[0_0_100px_rgba(79,70,229,0.4)]"
          >
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <LucideTrophy className="text-white" size={40} />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Congratulations!</h2>
            <p className="text-indigo-100 mb-8">It's your turn to receive the payout pool.</p>
            
            <div className="bg-black/20 rounded-2xl p-6 mb-8">
              <div className="text-sm text-indigo-200 uppercase tracking-widest font-bold mb-1">Received Payout</div>
              <div className="text-4xl font-black text-white">${amount} <span className="text-lg opacity-50">USDC</span></div>
            </div>

            <button 
              onClick={onClose}
              className="w-full py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg"
            >
              Great!
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};