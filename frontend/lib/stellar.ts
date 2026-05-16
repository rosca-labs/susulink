import { Horizon, rpc, Networks } from '@stellar/stellar-sdk';

export const STELLAR_CONFIG = {
  NETWORK: process.env.NEXT_PUBLIC_STELLAR_NETWORK || 'TESTNET',
  HORIZON_URL: process.env.NEXT_PUBLIC_HORIZON_URL || 'https://horizon-testnet.stellar.org',
  RPC_URL: process.env.NEXT_PUBLIC_RPC_URL || 'https://soroban-testnet.stellar.org',
  PASSPHRASE: process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE || Networks.TESTNET,
  USDC_ISSUER: process.env.NEXT_PUBLIC_USDC_ISSUER || 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5',
};

export const server = new Horizon.Server(STELLAR_CONFIG.HORIZON_URL);
export const rpcServer = new rpc.Server(STELLAR_CONFIG.RPC_URL);