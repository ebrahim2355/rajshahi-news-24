import { Router } from "express";
import { StoryModel, toPublicStory, type StoryDoc } from "../models/Story.js";
import { isDbReady } from "../db.js";

export const storiesRouter = Router();

/** Lead + top row for the homepage hero (matches frontend `Story` shape). */
storiesRouter.get("/hero", async (_req, res) => {
  if (!isDbReady()) {
    return res.status(503).json({ error: "Database unavailable" });
  }
  try {
    const leadRows = await StoryModel.find({ section: "lead" })
      .sort({ order: 1 })
      .limit(1)
      .lean();
    const topRows = await StoryModel.find({ section: "top" })
      .sort({ order: 1 })
      .limit(8)
      .lean();
    const leadDoc = leadRows[0] as unknown as StoryDoc | undefined;
    const topDocs = topRows as unknown as StoryDoc[];

    const lead = leadDoc ? toPublicStory(leadDoc) : null;
    const top = topDocs.map((d) => toPublicStory(d));

    res.json({ lead, top });
  } catch {
    res.status(500).json({ error: "Failed to load stories" });
  }
});
