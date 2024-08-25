import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config"; // Ensure JWT_SECRET is properly imported

interface DecodedToken {
  userId: number;
}

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  const token = authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

    req.userId = decoded.userId;

    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};
