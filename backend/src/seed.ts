import "dotenv/config";
import { connectDb } from "./db.js";
import { StoryModel, type StoryDoc } from "./models/Story.js";
import { ArticleModel } from "./models/Article.js";
import { PollModel } from "./models/Poll.js";
import { PollVoteModel } from "./models/PollVote.js";
import { CommentModel } from "./models/Comment.js";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Missing MONGODB_URI in environment");
  process.exit(1);
}

const img = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const seedStories: StoryDoc[] = [
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

const articleBodies: Record<string, string> = {
  "bonya-protirodh": [
    "উপকূলের শহরগুলোতে ঝুঁকি মোকাবিলায় নতুন ধরনের বাঁধ ও জলাভূমি পুনরুদ্ধারে জোর দেওয়া হচ্ছে।",
    "পরিকল্পনা অনুযায়ী বেশ কয়েকটি স্থানে সার্জ গেট স্থাপনের পাশাপাশি বাসিন্দাদের সতর্কতা জুড়ে স্থানান্তরে প্রস্তুতি রাখা হবে।",
  ].join("\n\n"),
  "abason-bil": [
    "নতুন আবাসন বিলে জোনিং সংস্কার, ভাড়া সুরক্ষা ও প্রথম ঘর কেনারা জন্য সুদ সহনীয় ঋণ সুবিধা নিয়ে কথা হচ্ছে।",
    "বিলটি আইনে পরিণত হলে কিছু ধাপে বাস্তবায়ন ধরা হবে, তবে স্থানীয় সরকারকে নিয়ে আলোচনা এখনও চলছে।",
  ].join("\n\n"),
  "kendrio-bank-son": [
    "কেন্দ্রীয় ব্যাংক ঘোষিত সিদান্তে সুদের হার অপরিবর্তিত, তবে এখনকার আর্থিক পরিসংখ্যান দেখে পরবর্তী সিদান্ত ঘোষিত হবে।",
  ].join("\n\n"),
  "netoyork-10-bochor": [
    "আঞ্চলিক পরিবহন কর্তৃপক্ষ দীর্ঘমেয়াদি মানচিত্রে বাস, রেল ও সাইকেল লেনকে যুক্ত করার পরিকল্পনা ঘোষণা করেছে।",
  ].join("\n\n"),
  "juddhobritir-embassy": [
    "যুদ্ধবিরতি তৃতীয় দিন পর্যন্ত স্থিতিশীল থাকার পর কূটনীতিকরা সীমান্তে ত্রাণ সরবরাহ নিয়ে আলোচনা চালাচ্ছেন।",
  ].join("\n\n"),
  "sports-underdog": [
    "অঞ্চলের ছোট ক্লাব ৩৭ বছর পর কাপের ফাইনালে। সমর্থকদের উচ্ছ্বাসাঘাতে স্টেডিয়াম ঠাসা।",
  ].join("\n\n"),
  "b-f": [
    "ক্লিনিকে এআই-সহকারি নিয়ে স্টার্টআপগুলোর বর্ধমান প্রতিযোগিতা, নিয়ন্ত্রকমণ্ডলীর নজরে গোপনীয়তা।",
  ].join("\n\n"),
  "e1": [
    "স্ট্রিমিং সেবা রহস্য সিরিজের অর্ডার নিশ্চিত করেছে; দ্বিতীয় সিজনের শুটিং আগামী বছর।",
  ].join("\n\n"),
};

const articlesSeed = [
  {
    slug: "bonya-protirodh",
    title: seedStories[0]!.title,
    summary: seedStories[0]!.summary,
    category: seedStories[0]!.category,
    timeAgo: seedStories[0]!.timeAgo,
    imageSrc: seedStories[0]!.imageSrc,
    imageAlt: seedStories[0]!.imageAlt,
    imageGallery: [
      { imageSrc: img("flood-2", 960, 540), imageAlt: "কাজ শুরু, বাঁধ নির্মাণ" },
      { imageSrc: img("flood-3", 960, 540), imageAlt: "নদীর পাড়ে নজরদারি" },
    ],
  },
  {
    slug: "abason-bil",
    title: seedStories[1]!.title,
    summary: seedStories[1]!.summary,
    category: seedStories[1]!.category,
    timeAgo: seedStories[1]!.timeAgo,
    imageSrc: seedStories[1]!.imageSrc,
    imageAlt: seedStories[1]!.imageAlt,
    imageGallery: [
      { imageSrc: img("parl-g2", 720, 480), imageAlt: "সংসদ হল" },
    ],
  },
  {
    slug: "kendrio-bank-son",
    title: seedStories[2]!.title,
    summary: seedStories[2]!.summary,
    category: seedStories[2]!.category,
    timeAgo: seedStories[2]!.timeAgo,
    imageSrc: seedStories[2]!.imageSrc,
    imageAlt: seedStories[2]!.imageAlt,
    imageGallery: [
      { imageSrc: img("cbank-g2", 720, 480), imageAlt: "মুদ্রা নোট" },
    ],
  },
  {
    slug: "netoyork-10-bochor",
    title: seedStories[3]!.title,
    summary: seedStories[3]!.summary,
    category: seedStories[3]!.category,
    timeAgo: seedStories[3]!.timeAgo,
    imageSrc: seedStories[3]!.imageSrc,
    imageAlt: seedStories[3]!.imageAlt,
    imageGallery: [
      { imageSrc: img("transit-g2", 720, 480), imageAlt: "রুটের মানচিত্র" },
    ],
  },
  {
    slug: "juddhobritir-embassy",
    title:
      "যুদ্ধবিরতির তৃতীয় দিন পর্যন্ত টিকে থাকায় দূতাবাস খালি করার কাজ শেষ",
    summary:
      "প্রধান সীমান্ত শহরগুলোতে বেসামরিক করিডর খোলা, ত্রাণ কাফিলা নতুন সরবরাহের পরিকল্পনা করছে।",
    category: "বিশ্ব",
    timeAgo: "২০ মিনিট আগে",
    imageSrc: img("embassy1", 720, 480),
    imageAlt: "কূটনৈতিক ভবন",
  },
  {
    slug: "sports-underdog",
    title: "আন্ডারডগ ক্লাব ৩৭ বছরে প্রথম কাপ ফাইনালে উঠল",
    summary: "রাতের স্টেডিয়ামে সমর্থকদের উচ্ছ্বাস, প্রতিপক্ষ শক্তিশালী দল।",
    category: "ফুটবল",
    timeAgo: "১৫ মিনিট আগে",
    imageSrc: img("sports1", 400, 260),
    imageAlt: "রাতে স্টেডিয়ামে ফ্লাডলাইট",
  },
  {
    slug: "b-f",
    title: "ক্ষুদ্র ক্লিনিকের জন্য এআই কো-পাইলট বানাতে স্টার্টআপগুলোর প্রতিযোগিতা",
    summary: "নিয়ন্ত্রকরা গোপনীয়তা ও নিরাপত্তা কড়া পর্যবেক্ষণ করছেন।",
    category: "প্রযুক্তি",
    timeAgo: "৫০ মিনিট আগে",
    imageSrc: img("clinic1", 720, 480),
    imageAlt: "ট্যাবলেট হাতে ক্লিনিক স্টাফ",
  },
  {
    slug: "e1",
    title: "স্ট্রিমিং সেবা জনপ্রিয় রহস্য সিরিজের দ্বিতীয় সিজন অর্ডার করেছে",
    summary: "দর্শক ধরে রাখা শেষ ক্লিফহ্যাংগার ঘিরে আলোচনা।",
    category: "টিভি",
    timeAgo: "১০ মিনিট আগে",
    imageSrc: img("ent1", 400, 260),
    imageAlt: "সেটে আলোকসজ্জা",
  },
].map((a) => ({
  ...a,
  content: articleBodies[a.slug] ?? a.summary ?? "",
}));

async function run() {
  await connectDb(uri!);
  await Promise.all([
    StoryModel.deleteMany({}),
    ArticleModel.deleteMany({}),
    CommentModel.deleteMany({}),
    PollModel.deleteMany({}),
    PollVoteModel.deleteMany({}),
  ]);
  await StoryModel.insertMany(seedStories);
  await ArticleModel.insertMany(articlesSeed);
  await PollModel.create({
    question: "আপনি কীভাবে প্রধানত খবর পড়েন?",
    isActive: true,
    options: [
      { id: "a", text: "ওয়েবসাইট", count: 0 },
      { id: "b", text: "মোবাইল অ্যাপ", count: 0 },
      { id: "c", text: "সামাজিক মাধ্যম", count: 0 },
      { id: "d", text: "মুদ্রিত কাগজ", count: 0 },
    ],
  });
  console.log(
    `Seeded ${seedStories.length} stories, ${articlesSeed.length} articles, 1 poll.`
  );
  process.exit(0);
}

void run().catch((e) => {
  console.error(e);
  process.exit(1);
});
