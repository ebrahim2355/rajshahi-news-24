import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    facebookId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String },
    picture: { type: String },
  },
  { timestamps: true, versionKey: false }
);

export type UserProfile = {
  id: string;
  name: string;
  email?: string;
  picture?: string;
};

export const UserModel =
  mongoose.models.User ?? mongoose.model("User", userSchema);
