import { Router } from "express";
import { signUserToken } from "../lib/jwt.js";
import { verifyFacebookAccessToken } from "../lib/verify-facebook.js";
import { isDbReady } from "../db.js";
import { UserModel, type UserProfile } from "../models/User.js";
import { optionalUser, type AuthedRequest } from "../middleware/auth.js";

function toProfile(user: {
  _id: { toString: () => string };
  name: string;
  email?: string;
  picture?: string;
}): UserProfile {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    picture: user.picture,
  };
}

export const authRouter = Router();

authRouter.post("/facebook", async (req, res) => {
  if (!isDbReady()) {
    return res.status(503).json({ error: "Database unavailable" });
  }
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: "Server authentication is not configured" });
  }
  const accessToken = typeof req.body?.accessToken === "string" ? req.body.accessToken : "";
  if (!accessToken) {
    return res.status(400).json({ error: "accessToken is required" });
  }

  const fb = await verifyFacebookAccessToken(accessToken);
  if (!fb?.id) {
    return res.status(401).json({ error: "Invalid Facebook access token" });
  }

  const picture = fb.picture?.data?.url;
  const user = await UserModel.findOneAndUpdate(
    { facebookId: fb.id },
    {
      $set: {
        name: fb.name || "User",
        email: fb.email,
        picture: picture,
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
  );

  if (!user) {
    return res.status(500).json({ error: "Failed to create user" });
  }

  const token = signUserToken(user._id.toString());
  return res.json({ token, user: toProfile(user) });
});

authRouter.get("/me", optionalUser, async (req, res) => {
  if (!isDbReady()) {
    return res.status(503).json({ error: "Database unavailable" });
  }
  const uid = (req as AuthedRequest).userId;
  if (!uid) {
    return res.json({ user: null as UserProfile | null });
  }
  const u = await UserModel.findById(uid).lean();
  if (!u) {
    return res.json({ user: null as UserProfile | null });
  }
  const user = u as unknown as {
    _id: { toString: () => string };
    name: string;
    email?: string;
    picture?: string;
  };
  return res.json({
    user: {
      id: String(user._id),
      name: user.name,
      email: user.email,
      picture: user.picture,
    } as UserProfile,
  });
});
