import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";
import circleRoutes from "./routes/circles.js";

config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(helmet());
app.use(express.json());

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/circles", circleRoutes);

app.listen(PORT, () => {
  console.log(`SusuLink Backend running on port ${PORT}`);
});