import {
  requestAccess,
  signTransaction,
  isConnected,
} from "@stellar/freighter-api";

export const freighter = {
  checkConnection: async () => {
    return await isConnected();
  },
  connect: async () => {
    const address = await requestAccess();
    return address;
  },
  getAddress: async () => {
    // requestAccess also returns the current address if already authorized
    const address = await requestAccess();
    return address;
  },
  sign: async (xdr: string, network: string = "TESTNET") => {
    return await signTransaction(xdr, { networkPassphrase: network });
  },
};