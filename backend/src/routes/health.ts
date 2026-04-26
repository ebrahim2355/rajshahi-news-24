import { Router } from "express";
import { isDbReady } from "../db.js";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.json({
    ok: true,
    mongo: isDbReady() ? "connected" : "disconnected",
  });
});
