import mongoose from "mongoose";

export type StoryDoc = {
  id: string;
  title: string;
  summary?: string;
  category: string;
  timeAgo: string;
  imageSrc: string;
  imageAlt: string;
  section: "lead" | "top";
  order: number;
};

const storySchema = new mongoose.Schema<StoryDoc>(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    summary: { type: String },
    category: { type: String, required: true },
    timeAgo: { type: String, required: true },
    imageSrc: { type: String, required: true },
    imageAlt: { type: String, required: true },
    section: { type: String, required: true, enum: ["lead", "top"] },
    order: { type: Number, default: 0 },
  },
  { versionKey: false }
);

export const StoryModel =
  mongoose.models.Story ?? mongoose.model<StoryDoc>("Story", storySchema);

export function toPublicStory(d: StoryDoc) {
  return {
    id: d.id,
    title: d.title,
    summary: d.summary,
    category: d.category,
    timeAgo: d.timeAgo,
    imageSrc: d.imageSrc,
    imageAlt: d.imageAlt,
  };
}
