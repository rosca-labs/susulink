import { Router } from "express";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Challenge endpoint
router.post("/challenge", async (req, res) => {
  const { address } = req.body;
  if (!address) return res.status(400).json({ error: "Address required" });

  const nonce = nanoid(32);
  const timestamp = Date.now();

  // In a real SEP-10 flow, we would store this challenge or sign it.
  res.json({
    challenge: {
      address,
      nonce,
      timestamp,
    }
  });
});

// Verify endpoint
router.post("/verify", async (req, res) => {
  const { address, signature } = req.body;
  if (!address || !signature) {
    return res.status(400).json({ error: "Address and signature required" });
  }

  // Prototype: Verification is currently a presence check.
  // Real implementation would verify the signature against the nonce.
  
  const token = jwt.sign({ address }, JWT_SECRET, { expiresIn: "7d" });
  
  res.json({ token });
});

export default router;