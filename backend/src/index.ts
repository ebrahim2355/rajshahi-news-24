import "dotenv/config";
import cors from "cors";
import express from "express";
import { connectDb } from "./db.js";
import { healthRouter } from "./routes/health.js";
import { storiesRouter } from "./routes/stories.js";

const app = express();
const port = Number(process.env.PORT) || 5000;

const raw = process.env.FRONTEND_URL ?? "http://localhost:3000";
const origins = raw.split(",").map((s) => s.trim());

app.use(
  cors({
    origin: origins.length === 1 ? origins[0] : origins,
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ name: "project-news-api", docs: "/api/health" });
});

app.use("/api/health", healthRouter);
app.use("/api/stories", storiesRouter);

const mongoUri = process.env.MONGODB_URI;

async function main() {
  if (mongoUri) {
    try {
      await connectDb(mongoUri);
      console.log("MongoDB connected.");
    } catch (e) {
      console.warn("MongoDB connection failed; API will return 503 for data routes.", e);
    }
  } else {
    console.warn("MONGODB_URI is not set; data routes will return 503.");
  }

  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}

void main();
