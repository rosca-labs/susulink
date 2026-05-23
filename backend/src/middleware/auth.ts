import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const authMiddleware = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & { address?: string };
    const address = decoded.sub || decoded.address;

    if (!address) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = { ...decoded, address };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
