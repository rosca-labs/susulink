"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useWalletStore } from "../store/walletStore";
import { freighter } from "../lib/freighter";

const WalletContext = createContext({});

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const { address, setAddress } = useWalletStore();

  useEffect(() => {
    const checkConnection = async () => {
      const connected = await freighter.checkConnection();
      if (connected && !address) {
        // Optionally auto-connect or just verify
      }
    };
    checkConnection();
  }, [address, setAddress]);

  return (
    <WalletContext.Provider value={{}}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => useContext(WalletContext);