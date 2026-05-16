import { Router } from "express";
import { CircleService } from "../services/CircleService.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

// Create Circle
router.post("/create", authMiddleware, async (req: any, res) => {
  try {
    const circle = await CircleService.createCircle({
      ...req.body,
      creatorAddress: req.user.address,
    });
    res.status(201).json(circle);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Join Circle
router.post("/join", authMiddleware, async (req: any, res) => {
  try {
    const { inviteCode } = req.body;
    const member = await CircleService.joinCircle(inviteCode, req.user.address);
    res.status(201).json(member);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// My Circles
router.get("/mine/:address", authMiddleware, async (req: any, res) => {
  try {
    const { address } = req.params;
    // For security, ensure the address matches the authenticated user
    if (address !== req.user.address) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const circles = await CircleService.getMyCircles(address);
    res.json(circles);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;