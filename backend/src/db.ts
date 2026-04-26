import mongoose from "mongoose";

export async function connectDb(uri: string): Promise<void> {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
}

export function isDbReady(): boolean {
  return mongoose.connection.readyState === 1;
}
