import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WalletState {
  address: string | null;
  setAddress: (address: string | null) => void;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      address: null,
      setAddress: (address) => set({ address }),
      disconnect: () => {
        set({ address: null });
        localStorage.removeItem("susulink-token");
      },
    }),
    {
      name: "susulink-wallet",
    }
  )
);