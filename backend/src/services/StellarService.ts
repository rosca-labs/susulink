import { Horizon, Keypair, Networks, WebAuth, rpc } from '@stellar/stellar-sdk';
import jwt from 'jsonwebtoken';
import { STELLAR_CONFIG } from '../config/stellar.js';
import { MemoryChallengeStore } from './ChallengeStore.js';

export class Sep10AuthError extends Error {}
export class StellarAuthConfigError extends Error {}
export class StellarAuthValidationError extends Error {}

interface StellarServiceOptions {
  serverSecret?: string;
  homeDomain?: string;
  webAuthDomain?: string;
  networkPassphrase?: string;
  challengeTimeoutSeconds?: number;
  jwtSecret?: string;
  jwtExpiresInSeconds?: number;
  challengeStore?: MemoryChallengeStore;
  now?: () => number;
}

export class StellarService {
  private horizonServer: Horizon.Server;
  private rpcServer: rpc.Server;
  private serverSecret: string;
  private homeDomain: string;
  private webAuthDomain: string;
  private networkPassphrase: string;
  private challengeTimeoutSeconds: number;
  private jwtSecret: string;
  private jwtExpiresInSeconds: number;
  private challengeStore: MemoryChallengeStore;
  private now: () => number;

  constructor(options: StellarServiceOptions = {}) {
    this.horizonServer = new Horizon.Server(STELLAR_CONFIG.HORIZON_URL);
    this.rpcServer = new rpc.Server(STELLAR_CONFIG.RPC_URL);
    this.serverSecret =
      options.serverSecret ||
      process.env.STELLAR_AUTH_SECRET ||
      process.env.STELLAR_SERVER_SECRET ||
      STELLAR_CONFIG.SERVICE_SECRET;
    this.homeDomain = options.homeDomain || process.env.SEP10_HOME_DOMAIN || 'susulink.app';
    this.webAuthDomain =
      options.webAuthDomain || process.env.SEP10_WEB_AUTH_DOMAIN || this.homeDomain;
    this.networkPassphrase =
      options.networkPassphrase ||
      (STELLAR_CONFIG.NETWORK === 'MAINNET' ? Networks.PUBLIC : Networks.TESTNET);
    this.challengeTimeoutSeconds = options.challengeTimeoutSeconds || 300;
    this.jwtSecret = options.jwtSecret || process.env.JWT_SECRET || 'supersecret';
    this.jwtExpiresInSeconds = options.jwtExpiresInSeconds || 7 * 24 * 60 * 60;
    this.challengeStore = options.challengeStore || new MemoryChallengeStore();
    this.now = options.now || Date.now;
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

  async buildSep10Challenge(account: string) {
    this.assertPublicKey(account);

    const serverKeypair = this.getServerKeypair();
    const transaction = WebAuth.buildChallengeTx(
      serverKeypair,
      account,
      this.homeDomain,
      this.challengeTimeoutSeconds,
      this.networkPassphrase,
      this.webAuthDomain,
    );
    const challengeId = this.getChallengeId(transaction, serverKeypair.publicKey());
    const expiresAt = this.now() + this.challengeTimeoutSeconds * 1000;

    this.challengeStore.set(challengeId, {
      account,
      expiresAt,
    });

    return {
      transaction,
      networkPassphrase: this.networkPassphrase,
      homeDomain: this.homeDomain,
      webAuthDomain: this.webAuthDomain,
      challengeId,
      expiresAt,
    };
  }

  async verifySep10Challenge(signedTransaction: string) {
    if (!signedTransaction) {
      throw new StellarAuthValidationError('Signed challenge transaction is required.');
    }

    const serverKeypair = this.getServerKeypair();
    const serverAccount = serverKeypair.publicKey();

    try {
      const { clientAccountID } = WebAuth.readChallengeTx(
        signedTransaction,
        serverAccount,
        this.networkPassphrase,
        this.homeDomain,
        this.webAuthDomain,
      );
      const challengeId = this.getChallengeId(signedTransaction, serverAccount);
      const issuedChallenge = this.challengeStore.get(challengeId, this.now());

      if (!issuedChallenge || issuedChallenge.account !== clientAccountID) {
        throw new Sep10AuthError('Challenge expired, was already used, or was not issued by this server.');
      }

      const signers = WebAuth.verifyChallengeTxSigners(
        signedTransaction,
        serverAccount,
        this.networkPassphrase,
        [clientAccountID],
        this.homeDomain,
        this.webAuthDomain,
      );

      this.challengeStore.delete(challengeId);

      const token = jwt.sign({}, this.jwtSecret, {
        subject: clientAccountID,
        expiresIn: this.jwtExpiresInSeconds,
      });

      return {
        token,
        account: clientAccountID,
        signers,
        expiresIn: this.jwtExpiresInSeconds,
      };
    } catch (error) {
      if (error instanceof Sep10AuthError || error instanceof StellarAuthValidationError) {
        throw error;
      }

      throw new Sep10AuthError(
        error instanceof Error ? error.message : 'Signed challenge transaction is invalid.',
      );
    }
  }

  private getServerKeypair() {
    try {
      return Keypair.fromSecret(this.serverSecret);
    } catch {
      throw new StellarAuthConfigError(
        'A valid SEP-10 server signing secret is required. Set STELLAR_AUTH_SECRET or SERVICE_SECRET_KEY.',
      );
    }
  }

  private assertPublicKey(account: string) {
    try {
      Keypair.fromPublicKey(account);
    } catch {
      throw new StellarAuthValidationError('Account must be a valid Stellar public key.');
    }
  }

  private getChallengeId(transaction: string, serverAccount: string) {
    const { tx } = WebAuth.readChallengeTx(
      transaction,
      serverAccount,
      this.networkPassphrase,
      this.homeDomain,
      this.webAuthDomain,
    );

    return tx.hash().toString('hex');
  }
}

export const stellarService = new StellarService();
