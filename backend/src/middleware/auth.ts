import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthPayload {
  userId: string;
  username?: string | undefined;
}

export interface AuthRequest extends Request {
  user?: AuthPayload | undefined;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Missing authorization header" });
    }

    const parts = authHeader.split(" ");
    const token = parts[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Missing token" });
    }

    const secret = process.env.JWT_SECRET || "your-secret-key";

    // Verify token and safely check payload shape
    const decoded = jwt.verify(token, secret);
    if (!decoded || typeof decoded !== "object" || Array.isArray(decoded) || !("userId" in decoded)) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    // Normalize payload fields to strings and attach to request
    const anyDecoded = decoded as any;
    const payload: AuthPayload = {
      userId: String(anyDecoded.userId),
      username: anyDecoded.username ? String(anyDecoded.username) : undefined,
    };
    req.user = payload;

    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
