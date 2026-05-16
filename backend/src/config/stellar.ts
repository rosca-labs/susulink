import { Networks } from "@stellar/stellar-sdk";

export const STELLAR_CONFIG = {
  NETWORK: process.env.STELLAR_NETWORK || "TESTNET",
  HORIZON_URL: process.env.HORIZON_URL || "https://horizon-testnet.stellar.org",
  RPC_URL: process.env.RPC_URL || "https://soroban-testnet.stellar.org",
  PASSPHRASE: process.env.STELLAR_NETWORK === "MAINNET" ? Networks.PUBLIC : Networks.TESTNET,
  USDC_ISSUER: process.env.USDC_ISSUER || "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5",
  SERVICE_SECRET: process.env.SERVICE_SECRET_KEY || "SERVICE_SECRET_KEY",
};