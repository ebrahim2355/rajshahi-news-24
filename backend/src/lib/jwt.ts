import jwt from "jsonwebtoken";

const ISSUER = "project-news";

export function signUserToken(userId: string): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return jwt.sign({ sub: userId }, secret, { expiresIn: "7d", issuer: ISSUER });
}

export function verifyUserToken(token: string): { userId: string } | null {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  try {
    const p = jwt.verify(token, secret, { issuer: ISSUER }) as jwt.JwtPayload;
    if (typeof p.sub !== "string" || !p.sub) return null;
    return { userId: p.sub };
  } catch {
    return null;
  }
}
