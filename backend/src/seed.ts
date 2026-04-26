import "dotenv/config";
import { connectDb } from "./db.js";
import { StoryModel, type StoryDoc } from "./models/Story.js";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Missing MONGODB_URI in environment");
  process.exit(1);
}

const img = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const seedStories: Omit<StoryDoc, never>[] = [
  {
    id: "lead-1",
    section: "lead",
    order: 0,
    title:
      "রেকর্ড ঝড়ের মৌসুমের পর উপকূলীয় শহরগুলোতে নতুন বন্যা প্রতিরোধ ব্যবস্থা এগিয়ে নিচ্ছে",
    summary:
      "কর্তৃপক্ষ বলছে, আধুনিক সার্জ গেট ও প্রকৃতিভিত্তিক বাধা কোটি মানুষকে রক্ষা করতে পারে, পাশাপাশি গুরুত্বপূর্ণ নদীমোহনায় জলাভূমি পুনরুদ্ধারও সম্ভব।",
    category: "জলবায়ু",
    timeAgo: "২ ঘণ্টা আগে",
    imageSrc: img("flood-hero", 960, 540),
    imageAlt: "সন্ধ্যায় উপকূলীয় শহরের আকাশ দৃশ্য",
  },
  {
    id: "t1",
    section: "top",
    order: 0,
    title: "আবাসন বিল নিয়ে বিতর্ক কেন্দ্রে রেখে সংসদ অধিবেশন শুরু",
    category: "রাজনীতি",
    timeAgo: "৪৫ মিনিট আগে",
    imageSrc: img("parliament1", 400, 260),
    imageAlt: "চলমান সংসদ অধিবেশন",
    summary:
      "জোনিং সংস্কার ও প্রথমবার ক্রেতাদের জন্য নতুন প্রণোদনা নিয়ে নেতারা মতবিরোধ করছেন।",
  },
  {
    id: "t2",
    section: "top",
    order: 1,
    title: "কেন্দ্রীয় ব্যাংক সুদের হার অপরিবর্তিত রেখেছে, তথ্যনির্ভর পথের ইঙ্গিত",
    category: "অর্থনীতি",
    timeAgo: "১ ঘণ্টা আগে",
    imageSrc: img("centralbank1", 400, 260),
    imageAlt: "কেন্দ্রীয় ব্যাংক ভবন",
    summary:
      "নীতিনির্ধারকরা বলছেন, মূল্যস্ফীতি কমছে কিন্তু তাদের আরামসীমায় এখনো পৌঁছায়নি।",
  },
  {
    id: "t3",
    section: "top",
    order: 2,
    title: "আঞ্চলিক পরিবহন কর্তৃপক্ষ ১০ বছরের নেটওয়ার্ক সম্প্রসারণের মানচিত্র প্রকাশ করেছে",
    category: "নগর",
    timeAgo: "৩ ঘণ্টা আগে",
    imageSrc: img("transit1", 400, 260),
    imageAlt: "প্ল্যাটফর্মে আধুনিক মেট্রো",
    summary:
      "নতুন লাইট রেল ও বাস লেন পৌর শহরকে কেন্দ্রের সঙ্গে যুক্ত করার লক্ষ্য নিয়েছে।",
  },
];

async function run() {
  await connectDb(uri!);
  await StoryModel.deleteMany({});
  await StoryModel.insertMany(seedStories);
  console.log(`Seeded ${seedStories.length} stories.`);
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
