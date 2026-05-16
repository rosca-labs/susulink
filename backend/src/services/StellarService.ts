import { Horizon, rpc, Keypair, TransactionBuilder, Asset, Operation, Networks } from '@stellar/stellar-sdk';
import { STELLAR_CONFIG } from '../config/stellar.js';

export class StellarService {
  private horizonServer: Horizon.Server;
  private rpcServer: rpc.Server;

  constructor() {
    this.horizonServer = new Horizon.Server(STELLAR_CONFIG.HORIZON_URL);
    this.rpcServer = new rpc.Server(STELLAR_CONFIG.RPC_URL);
  }

  async getAccount(address: string) {
    return await this.horizonServer.loadAccount(address);
  }

  async getUsdcBalance(address: string) {
    const account = await this.getAccount(address);
    const balance = account.balances.find(
      (b: any) => b.asset_code === 'USDC' && b.asset_issuer === STELLAR_CONFIG.USDC_ISSUER
    );
    return balance ? parseFloat(balance.balance) : 0;
  }
}

export const stellarService = new StellarService();