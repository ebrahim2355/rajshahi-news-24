import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    summary: { type: String },
    content: { type: String, required: true },
    category: { type: String, required: true },
    timeAgo: { type: String, required: true },
    imageSrc: { type: String, required: true },
    imageAlt: { type: String, required: true },
    imageGallery: {
      type: [
        {
          imageSrc: { type: String, required: true },
          imageAlt: { type: String, required: true },
        },
      ],
      default: undefined,
    },
    videos: {
      type: [
        {
          url: { type: String, required: true },
          title: { type: String, default: "" },
        },
      ],
      default: undefined,
    },
  },
  { timestamps: true, versionKey: false }
);

export const ArticleModel =
  mongoose.models.Article ?? mongoose.model("Article", articleSchema);
