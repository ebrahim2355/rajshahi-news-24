import type { Request, RequestHandler } from "express";
import { verifyUserToken } from "../lib/jwt.js";

export type AuthedRequest = Request & { userId?: string };

function extractBearer(authorization: string | undefined): string | null {
  if (!authorization?.startsWith("Bearer ")) return null;
  return authorization.slice(7).trim() || null;
}

export const optionalUser: RequestHandler = (req, _res, next) => {
  const t = extractBearer(req.headers.authorization);
  if (t) {
    const p = verifyUserToken(t);
    if (p) (req as AuthedRequest).userId = p.userId;
  }
  next();
};

export const requireUser: RequestHandler = (req, res, next) => {
  const t = extractBearer(req.headers.authorization);
  if (!t) {
    return res.status(401).json({ error: "Authentication required" });
  }
  const p = verifyUserToken(t);
  if (!p?.userId) {
    return res.status(401).json({ error: "Invalid or expired session" });
  }
  (req as AuthedRequest & { userId: string }).userId = p.userId;
  return next();
};
