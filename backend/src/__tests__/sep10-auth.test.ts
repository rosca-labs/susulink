import { describe, expect, it } from "@jest/globals";
import { Keypair, Networks, TransactionBuilder } from "@stellar/stellar-sdk";
import jwt from "jsonwebtoken";
import { Sep10AuthError, StellarService } from "../services/StellarService.js";

function createService(now: () => number) {
  const server = Keypair.random();

  return {
    server,
    service: new StellarService({
      serverSecret: server.secret(),
      homeDomain: "susulink.test",
      webAuthDomain: "auth.susulink.test",
      networkPassphrase: Networks.TESTNET,
      jwtSecret: "test-secret",
      challengeTimeoutSeconds: 300,
      jwtExpiresInSeconds: 600,
      now,
    }),
  };
}

function signChallenge(transaction: string, signer: Keypair) {
  const parsed = TransactionBuilder.fromXDR(transaction, Networks.TESTNET);
  parsed.sign(signer);
  return parsed.toEnvelope().toXDR("base64").toString();
}

describe("SEP-10 authentication", () => {
  it("builds a challenge and verifies the signed response", async () => {
    let now = Date.now();
    const { service } = createService(() => now);
    const client = Keypair.random();
    const challenge = await service.buildSep10Challenge(client.publicKey());
    const signedChallenge = signChallenge(challenge.transaction, client);

    const session = await service.verifySep10Challenge(signedChallenge);
    const decoded = jwt.verify(session.token, "test-secret") as jwt.JwtPayload;

    expect(session.account).toBe(client.publicKey());
    expect(session.signers).toEqual([client.publicKey()]);
    expect(decoded.sub).toBe(client.publicKey());
    expect(decoded.iat).toBeDefined();
    expect(decoded.exp).toBeDefined();
    expect(decoded.exp! - decoded.iat!).toBe(600);
    now += 1;
  });

  it("rejects replayed challenges", async () => {
    const { service } = createService(() => Date.now());
    const client = Keypair.random();
    const challenge = await service.buildSep10Challenge(client.publicKey());
    const signedChallenge = signChallenge(challenge.transaction, client);

    await service.verifySep10Challenge(signedChallenge);
    await expect(service.verifySep10Challenge(signedChallenge)).rejects.toThrow(Sep10AuthError);
  });

  it("rejects expired challenges", async () => {
    let now = Date.now();
    const { service } = createService(() => now);
    const client = Keypair.random();
    const challenge = await service.buildSep10Challenge(client.publicKey());
    const signedChallenge = signChallenge(challenge.transaction, client);

    now += 301_000;

    await expect(service.verifySep10Challenge(signedChallenge)).rejects.toThrow(Sep10AuthError);
  });

  it("rejects signatures from a different account", async () => {
    const { service } = createService(() => Date.now());
    const client = Keypair.random();
    const attacker = Keypair.random();
    const challenge = await service.buildSep10Challenge(client.publicKey());
    const signedChallenge = signChallenge(challenge.transaction, attacker);

    await expect(service.verifySep10Challenge(signedChallenge)).rejects.toThrow(Sep10AuthError);
  });
});
