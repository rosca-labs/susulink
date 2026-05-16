"use client";

import { useWalletStore } from '../store/walletStore';
import { freighter } from '../lib/freighter';
import { toast } from 'react-hot-toast';

export const useWallet = () => {
  const { address, setAddress, disconnect: storeDisconnect } = useWalletStore();

  const connect = async () => {
    try {
      const { address: addr } = await freighter.connect();
      setAddress(addr);
      toast.success("Wallet connected!");
      return addr;
    } catch (err: any) {
      toast.error(err.message || "Connection failed");
      return null;
    }
  };

  const disconnect = () => {
    storeDisconnect();
    toast.success("Disconnected");
  };

  return {
    address,
    isConnected: !!address,
    connect,
    disconnect
  };
};