import { Router } from "express";
import { Types } from "mongoose";
import { PollModel } from "../models/Poll.js";
import { PollVoteModel } from "../models/PollVote.js";
import { isDbReady } from "../db.js";
import { optionalUser, type AuthedRequest } from "../middleware/auth.js";

type Opt = { id: string; text: string; count: number };

type LeanPoll = {
  _id: Types.ObjectId;
  question: string;
  options: Opt[];
  isActive: boolean;
};

export const pollsRouter = Router();

function resolveVoterKey(
  userId: string | undefined,
  guestId: string | undefined
): { key: string } | { error: string } {
  if (userId) {
    return { key: `user:${userId}` };
  }
  if (guestId && /^[0-9a-f-]{8,64}$/i.test(guestId)) {
    return { key: `guest:${guestId}` };
  }
  return {
    error: "Log in with Facebook, or send guestId (UUID) from the site to vote once.",
  };
}

pollsRouter.get("/current", async (_req, res) => {
  if (!isDbReady()) {
    return res.status(503).json({ error: "Database unavailable" });
  }
  const p = (await PollModel.findOne({ isActive: true }).sort({ createdAt: -1 }).lean()) as
    | LeanPoll
    | null;
  if (!p) {
    return res.json({ poll: null });
  }
  return res.json({
    poll: {
      id: String(p._id),
      question: p.question,
      options: (p.options ?? []).map((o: Opt) => ({
        id: o.id,
        text: o.text,
        count: o.count,
      })),
    },
  });
});

pollsRouter.post("/:pollId/vote", optionalUser, async (req, res) => {
  if (!isDbReady()) {
    return res.status(503).json({ error: "Database unavailable" });
  }
  const userId = (req as AuthedRequest).userId;

  const optionId = typeof req.body?.optionId === "string" ? req.body.optionId : "";
  const guestId = typeof req.body?.guestId === "string" ? req.body.guestId : undefined;

  if (!optionId) {
    return res.status(400).json({ error: "optionId is required" });
  }

  const keyResult = resolveVoterKey(userId, guestId);
  if ("error" in keyResult) {
    return res.status(400).json({ error: keyResult.error });
  }
  const voterKey = keyResult.key;

  if (!Types.ObjectId.isValid(req.params.pollId)) {
    return res.status(400).json({ error: "Invalid poll id" });
  }

  const session = await PollModel.startSession();
  try {
    await session.withTransaction(async () => {
      const poll = await PollModel.findById(req.params.pollId).session(session);
      if (!poll || !poll.isActive) {
        throw new Error("NOT_FOUND");
      }
      const opt = poll.options.find((o: Opt) => o.id === optionId);
      if (!opt) {
        throw new Error("BAD_OPTION");
      }
      const existing = await PollVoteModel.findOne({
        poll: poll._id,
        voterKey,
      }).session(session);
      if (existing) {
        throw new Error("ALREADY");
      }
      opt.count = (opt.count ?? 0) + 1;
      await poll.save({ session });
      await PollVoteModel.create(
        [
          {
            poll: poll._id,
            optionId,
            voterKey,
          },
        ],
        { session }
      );
    });
  } catch (e) {
    const message = (e as Error).message;
    if (message === "NOT_FOUND") {
      return res.status(404).json({ error: "Poll not found" });
    }
    if (message === "BAD_OPTION") {
      return res.status(400).json({ error: "Invalid option" });
    }
    if (message === "ALREADY") {
      return res.status(409).json({ error: "You have already voted in this poll" });
    }
    if ((e as { code?: number }).code === 11000) {
      return res.status(409).json({ error: "You have already voted in this poll" });
    }
    return res.status(500).json({ error: "Vote failed" });
  } finally {
    await session.endSession();
  }

  const updated = (await PollModel.findById(req.params.pollId).lean()) as LeanPoll | null;
  if (!updated) {
    return res.status(404).json({ error: "Poll not found" });
  }
  return res.json({
    poll: {
      id: String(updated._id),
      question: updated.question,
      options: (updated.options ?? []).map((o: Opt) => ({
        id: o.id,
        text: o.text,
        count: o.count,
      })),
    },
  });
});
