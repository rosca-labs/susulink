"use client";

import React, { createContext, useContext } from "react";
import { STELLAR_CONFIG, server, rpcServer } from "../lib/stellar";

const StellarContext = createContext({
  config: STELLAR_CONFIG,
  server,
  rpcServer
});

export const StellarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StellarContext.Provider value={{ config: STELLAR_CONFIG, server, rpcServer }}>
      {children}
    </StellarContext.Provider>
  );
};

export const useStellar = () => useContext(StellarContext);