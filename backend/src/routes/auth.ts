import { Router } from "express";
import {
  Sep10AuthError,
  StellarAuthConfigError,
  StellarAuthValidationError,
  stellarService,
} from "../services/StellarService.js";

const router = Router();

async function issueChallenge(req: any, res: any) {
  const account = req.query.account || req.body?.account || req.body?.address;

  if (typeof account !== "string" || !account) {
    return res.status(400).json({ error: "A Stellar account is required." });
  }

  try {
    const challenge = await stellarService.buildSep10Challenge(account);

    return res.json(challenge);
  } catch (error) {
    if (error instanceof StellarAuthValidationError) {
      return res.status(400).json({ error: error.message });
    }

    if (error instanceof StellarAuthConfigError) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(500).json({ error: "Could not build SEP-10 challenge." });
  }
}

router.get("/challenge", issueChallenge);
router.post("/challenge", issueChallenge);

// Verify endpoint
router.post("/verify", async (req, res) => {
  const signedTransaction = req.body?.transaction || req.body?.signedTransaction || req.body?.signedXdr;

  if (typeof signedTransaction !== "string" || !signedTransaction) {
    return res.status(400).json({ error: "Signed challenge transaction is required." });
  }

  try {
    const session = await stellarService.verifySep10Challenge(signedTransaction);

    return res.json({
      token: session.token,
      token_type: "Bearer",
      expires_in: session.expiresIn,
      account: session.account,
    });
  } catch (error) {
    if (error instanceof Sep10AuthError) {
      return res.status(401).json({ error: error.message });
    }

    if (error instanceof StellarAuthValidationError) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Could not verify SEP-10 challenge." });
  }
});

export default router;
