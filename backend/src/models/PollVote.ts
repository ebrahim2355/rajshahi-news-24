import mongoose from "mongoose";

const pollVoteSchema = new mongoose.Schema(
  {
    poll: { type: mongoose.Schema.Types.ObjectId, ref: "Poll", required: true, index: true },
    optionId: { type: String, required: true },
    /** `user:ObjectId` for logged-in voters, or `guest:uuid` for anonymous */
    voterKey: { type: String, required: true, index: true },
  },
  { versionKey: false }
);

pollVoteSchema.index({ poll: 1, voterKey: 1 }, { unique: true });

export const PollVoteModel =
  mongoose.models.PollVote ?? mongoose.model("PollVote", pollVoteSchema);
