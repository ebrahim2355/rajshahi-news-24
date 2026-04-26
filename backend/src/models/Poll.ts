import mongoose from "mongoose";

const pollOptionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    text: { type: String, required: true },
    count: { type: Number, default: 0, min: 0 },
  },
  { _id: false }
);

const pollSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    options: { type: [pollOptionSchema], required: true },
  },
  { timestamps: true, versionKey: false }
);

export const PollModel =
  mongoose.models.Poll ?? mongoose.model("Poll", pollSchema);
