export type Story = {
  id: string;
  title: string;
  summary?: string;
  category: string;
  timeAgo: string;
  imageSrc: string;
  imageAlt: string;
};

export type Columnist = {
  id: string;
  name: string;
  title: string;
  articleTitle: string;
  avatar: string;
};

export type VideoItem = {
  id: string;
  title: string;
  duration: string;
  thumb: string;
};

export type InfographicItem = {
  id: string;
  label: string;
  detail: string;
};

const img = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const site = {
  name: "রাজশাহী নিউজ ২৪",
  tagline: "স্পষ্ট প্রতিবেদন, পূর্ণ চিত্র।",
  phone: "+৮৮০ ১৭২২-৩৪৫৬৭৮",
  /** E.164 for tel: — display uses Bengali numerals in `phone` */
  phoneTel: "+8801722345678",
  dateLine: "বৃহস্পতিবার, ২৩ এপ্রিল ২০২৬",
};

export const navPrimary = [
  { href: "#", label: "প্রচ্ছদ" },
  { href: "#national", label: "জাতীয়" },
  { href: "#politics", label: "রাজনীতি" },
  { href: "#business", label: "বাণিজ্য" },
  { href: "#world", label: "বিশ্ব" },
  { href: "#sports", label: "খেলা" },
  { href: "#entertainment", label: "বিনোদন" },
  { href: "#lifestyle", label: "জীবনধারা" },
  { href: "#opinion", label: "মতামত" },
] as const;

export const navTrending = [
  "শেয়ারবাজার",
  "জলবায়ু",
  "নির্বাচন",
  "স্বাস্থ্য",
  "প্রযুক্তি",
  "ক্রিকেট",
] as const;

export const leadStory: Story = {
  id: "lead-1",
  title:
    "রেকর্ড ঝড়ের মৌসুমের পর উপকূলীয় শহরগুলোতে নতুন বন্যা প্রতিরোধ ব্যবস্থা এগিয়ে নিচ্ছে",
  summary:
    "কর্তৃপক্ষ বলছে, আধুনিক সার্জ গেট ও প্রকৃতিভিত্তিক বাধা কোটি মানুষকে রক্ষা করতে পারে, পাশাপাশি গুরুত্বপূর্ণ নদীমোহনায় জলাভূমি পুনরুদ্ধারও সম্ভব।",
  category: "জলবায়ু",
  timeAgo: "২ ঘণ্টা আগে",
  imageSrc: img("flood-hero", 960, 540),
  imageAlt: "সন্ধ্যায় উপকূলীয় শহরের আকাশ দৃশ্য",
};

export const topRowStories: Story[] = [
  {
    id: "t1",
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
    title: "আঞ্চলিক পরিবহন কর্তৃপক্ষ ১০ বছরের নেটওয়ার্ক সম্প্রসারণের মানচিত্র প্রকাশ করেছে",
    category: "নগর",
    timeAgo: "৩ ঘণ্টা আগে",
    imageSrc: img("transit1", 400, 260),
    imageAlt: "প্ল্যাটফর্মে আধুনিক মেট্রো",
    summary:
      "নতুন লাইট রেল ও বাস লেন পৌর শহরকে কেন্দ্রের সঙ্গে যুক্ত করার লক্ষ্য নিয়েছে।",
  },
];

export const headlineList: { id: string; title: string; time: string }[] = [
  {
    id: "hl1",
    title: "জাতিসংঘ সম্মেলন শুরু, অভিবাসনে ‘নতুন ঐক্য’র আহ্বান",
    time: "১২ মি",
  },
  {
    id: "hl2",
    title: "চিপ নির্মাতারা নতুন কারখানায় পানি পুনর্ব্যবহারে যৌথ প্রতিশ্রুতি দিল",
    time: "২৮ মি",
  },
  {
    id: "hl3",
    title: "প্রো বাস্কেটবল ফাইনাল: অতিরিক্ত সময়ে অতিথি দল প্রথম ম্যাচ জিতল",
    time: "৪১ মি",
  },
  {
    id: "hl4",
    title: "পর্যালোচনা: শান্ত পারিবারিক নাটক, শেষ টাইটেলের পরেও মনে থাকে",
    time: "৫৫ মি",
  },
  {
    id: "hl5",
    title: "চিকিৎসক সংগঠন ঘুমের শ্বাসকষ্ট স্ক্রিনিং নির্দেশনা হালনাগাদ করেছে",
    time: "১ ঘণ্টা",
  },
  {
    id: "hl6",
    title: "বন্য আগুন নিয়ন্ত্রণ দল উত্তর পার্শ্বে আগুন ঘেরাও করতে সক্ষম হয়েছে",
    time: "২ ঘণ্টা",
  },
];

export const trendingGallery: { id: string; title: string; src: string }[] = [
  { id: "g1", title: "লাইভ ব্লগ — ধারাবাহিক আপডেট", src: img("g1", 320, 320) },
  { id: "g2", title: "ছবিতে: বসন্ত উৎসব", src: img("g2", 320, 320) },
  { id: "g3", title: "তথ্যচিত্র: সপ্তাহ সংক্ষেপে", src: img("g3", 320, 320) },
  { id: "g4", title: "মাঠ থেকে: বিশেষ প্রতিবেদন", src: img("g4", 320, 320) },
];

export const worldFeatured: Story = {
  id: "w-f",
  title: "যুদ্ধবিরতির তৃতীয় দিন পর্যন্ত টিকে থাকায় দূতাবাস খালি করার কাজ শেষ",
  category: "বিশ্ব",
  timeAgo: "২০ মিনিট আগে",
  imageSrc: img("embassy1", 720, 480),
  imageAlt: "কূটনৈতিক ভবন",
  summary:
    "প্রধান সীমান্ত শহরগুলোতে বেসামরিক করিডর খোলা, ত্রাণ কাফিলা নতুন সরবরাহের পরিকল্পনা করছে।",
};

export const worldList: Story[] = [
  {
    id: "w1",
    title: "অর্থমন্ত্রীদের আকস্মিক যৌথ বিবৃতি বিশ্ব মুদ্রাবাজারে প্রতিক্রিয়া",
    category: "বাজার",
    timeAgo: "৩৩ মিনিট আগে",
    imageSrc: img("currency1", 120, 90),
    imageAlt: "শেয়ার টিকার ডিসপ্লে",
  },
  {
    id: "w2",
    title: "ট্যাঙ্কার দুর্ঘটনার পর প্রশান্ত দ্বীপরাষ্ট্রগুলো বন্দর পরিদর্শন কড়া করল",
    category: "পরিবেশ",
    timeAgo: "১ ঘণ্টা আগে",
    imageSrc: img("tanker1", 120, 90),
    imageAlt: "বন্দরে জাহাজ",
  },
  {
    id: "w3",
    title: "পুরাতত্ত্ববিদরা রোম যুগের স্তর থেকে অক্ষত মোজাইক উদ্ধার করেছেন",
    category: "বিজ্ঞান",
    timeAgo: "২ ঘণ্টা আগে",
    imageSrc: img("mosaic1", 120, 90),
    imageAlt: "প্রাচীন মোজাইক ফ্লোর",
  },
  {
    id: "w4",
    title: "ভ্রমণ প্রদর্শনীতে সমসাময়িক শিল্পী ও স্থানীয় আর্কাইভ একসাথে",
    category: "সংস্কৃতি",
    timeAgo: "৩ ঘণ্টা আগে",
    imageSrc: img("exhibit1", 120, 90),
    imageAlt: "গ্যালারি দেয়ালে শিল্পকর্ম",
  },
];

export const sportsGrid: Story[] = [
  {
    id: "s1",
    title: "আন্ডারডগ ক্লাব ৩৭ বছরে প্রথম কাপ ফাইনালে উঠল",
    category: "ফুটবল",
    timeAgo: "১৫ মিনিট আগে",
    imageSrc: img("sports1", 400, 260),
    imageAlt: "রাতে স্টেডিয়ামে ফ্লাডলাইট",
  },
  {
    id: "s2",
    title: "স্প্রিন্ট তারকা মৌসুমের শুরুতে জাতীয় রেকর্ড ভেঙেছে",
    category: "অ্যাথলেটিক্স",
    timeAgo: "১ ঘণ্টা আগে",
    imageSrc: img("sports2", 400, 260),
    imageAlt: "ট্র্যাকে দৌড়বিদ",
  },
  {
    id: "s3",
    title: "হকি: ষষ্ঠ ম্যাচে অতিরিক্ত সময়ের গোলে হোম দর্শক নীরব",
    category: "হকি",
    timeAgo: "২ ঘণ্টা আগে",
    imageSrc: img("sports3", 400, 260),
    imageAlt: "আইস হকি মাঠে খেলা",
  },
  {
    id: "s4",
    title: "টেনিস: অভিজ্ঞ খেলোয়াড় ক্লে কোর্টে পাঁচ সেটে অঘটন ঘটাল",
    category: "টেনিস",
    timeAgo: "৪ ঘণ্টা আগে",
    imageSrc: img("sports4", 400, 260),
    imageAlt: "টেনিস খেলোয়াড় সার্ভ দিচ্ছেন",
  },
];

export const businessFeatured: Story = {
  id: "b-f",
  title: "ক্ষুদ্র ক্লিনিকের জন্য এআই কো-পাইলট বানাতে স্টার্টআপগুলোর প্রতিযোগিতা",
  category: "প্রযুক্তি",
  timeAgo: "৫০ মিনিট আগে",
  imageSrc: img("clinic1", 720, 480),
  imageAlt: "ট্যাবলেট হাতে ক্লিনিক স্টাফ",
  summary:
    "বিক্রেতারা দ্রুত চার্টিংয়ের প্রতিশ্রুতি দিলে নিয়ন্ত্রকরা কড়া নজরে রাখছেন; মাঠে গোপনীয়তার নিশ্চয়তা এখনও পরীক্ষার মুখে।",
};

export const businessList: Story[] = [
  {
    id: "b1",
    title: "লজিস্টিকস ফার্ম রাতের বিলম্ব কমাতে স্বয়ংক্রিয় হাব চালু করেছে",
    category: "শিল্প",
    timeAgo: "১ ঘণ্টা আগে",
    imageSrc: img("logistics1", 120, 90),
    imageAlt: "বিতরণ কেন্দ্রের অভ্যন্তর",
  },
  {
    id: "b2",
    title: "খুচরা বিক্রেতারা দোকানে ফুটফল সতর্ভাবে ফিরে পাচ্ছেন বলে জানিয়েছে",
    category: "খুচরা",
    timeAgo: "২ ঘণ্টা আগে",
    imageSrc: img("retail1", 120, 90),
    imageAlt: "কেনাকাটার রাস্তা",
  },
  {
    id: "b3",
    title: "১২টি অঞ্চলে গৃহস্থ ব্যাটারি স্থাপনায় জ্বালানি ক্রেডিট প্রসারিত",
    category: "নীতি",
    timeAgo: "৩ ঘণ্টা আগে",
    imageSrc: img("solar1", 120, 90),
    imageAlt: "ছাদে সোলার প্যানেল",
  },
];

export const entertainmentGrid: Story[] = [
  {
    id: "e1",
    title: "স্ট্রিমিং সেবা জনপ্রিয় রহস্য সিরিজের দ্বিতীয় সিজন অর্ডার করেছে",
    category: "টিভি",
    timeAgo: "১০ মিনিট আগে",
    imageSrc: img("ent1", 400, 260),
    imageAlt: "সেটে আলোকসজ্জা",
  },
  {
    id: "e2",
    title: "ইন্ডি ব্যান্ড শরৎকালে নাট্যশালা ট্যুর ঘোষণা করেছে",
    category: "সংগীত",
    timeAgo: "১ ঘণ্টা আগে",
    imageSrc: img("ent2", 400, 260),
    imageAlt: "আলোতে কনসার্ট দর্শক",
  },
  {
    id: "e3",
    title: "স্টুডিও ব্লকবাস্টার সিক্যুয়েলের সাউন্ড মিক্স ঠিক করতে সময় বাড়িয়েছে",
    category: "চলচ্চিত্র",
    timeAgo: "২ ঘণ্টা আগে",
    imageSrc: img("ent3", 400, 260),
    imageAlt: "সিনেমা হলের পর্দা",
  },
];

export const columnists: Columnist[] = [
  {
    id: "c1",
    name: "আমিনা ক.",
    title: "বিদেশনীতি সম্পাদক",
    articleTitle: "কূটনীতি মেজাজ নয় — ঝুঁকি ও হিসাবের খাতা",
    avatar: "https://i.pravatar.cc/200?u=amk",
  },
  {
    id: "c2",
    name: "জোন রিভেরা",
    title: "অর্থনীতি কলামনিস্ট",
    articleTitle: "পরবর্তী পাওয়ার গ্রিডের বিল কে দেবে — নীরব লড়াই",
    avatar: "https://i.pravatar.cc/200?u=jr",
  },
  {
    id: "c3",
    name: "হেলেন সাতো",
    title: "বিজ্ঞান লেখক",
    articleTitle: "মহামারি প্রস্তুতি নিয়ে কথা — কিন্তু পয়ঃপ্রণালীর সূত্রে এখনো কম বাজেট",
    avatar: "https://i.pravatar.cc/200?u=hs",
  },
  {
    id: "c4",
    name: "মার্কাস কোল",
    title: "খেলা সম্পাদক",
    articleTitle: "কাপ রান শহর সারাতে পারে, কিন্তু লিগের ফাঁক ঢাকতে পারে না",
    avatar: "https://i.pravatar.cc/200?u=mc",
  },
];

export const videos: { main: VideoItem; more: VideoItem[] } = {
  main: {
    id: "v-main",
    title: "নতুন উপকূলীয় বাধার ভেতর: প্রকৌশলীরা লিভি হাঁটছেন",
    duration: "১২:৪০",
    thumb: img("video-main", 960, 540),
  },
  more: [
    {
      id: "v1",
      title: "সংবাদ সম্মেলন: অবকাঠামো বিল স্বাক্ষর",
      duration: "৬:১২",
      thumb: img("v1", 400, 220),
    },
    {
      id: "v2",
      title: "মাঠ প্রতিবেদন: কৃষকরা খরাসহিষ্ণু ফসল পরীক্ষা করছেন",
      duration: "৪:৫৫",
      thumb: img("v2", 400, 220),
    },
    {
      id: "v3",
      title: "স্টুডিও সাক্ষাৎকার: মেয়র প্রার্থীরা নিরাপত্তা নিয়ে",
      duration: "৮:০৩",
      thumb: img("v3", 400, 220),
    },
    {
      id: "v4",
      title: "হাইলাইটস: চ্যাম্পিয়নশিপ সেমিফাইনাল, পূর্ণ সারাংশ",
      duration: "৭:১৮",
      thumb: img("v4", 400, 220),
    },
  ],
};

export const photoOfDay = {
  title: "ফটো প্রতিবেদন: নীল গোধূলিতে নদীর হাট",
  kicker: "ছবি ডেস্ক",
  src: img("poday", 1600, 700),
  alt: "সন্ধ্যায় নদীতীরের ব্যস্ত হাট, স্ট্রিং লাইট",
  caption:
    "নদীর ব্যবসায়ী, নৈশ ফেরি ও জোয়ার চেনা বিক্রেতাদের দৃশ্য।",
};

export const infographics: InfographicItem[] = [
  { id: "i1", label: "মূল্যস্ফীতি (বাৎসরিক)", detail: "৩.১%" },
  { id: "i2", label: "বেকারত্বের হার", detail: "৪.২%" },
  { id: "i3", label: "৩০ বছরের বন্ধকী সুদ", detail: "৬.৭%" },
  { id: "i4", label: "তেল, ব্রেন্ট (ডলার)", detail: "৮২.৪" },
  { id: "i5", label: "গ্রিডে নবায়নযোগ্য", detail: "৪১%" },
  { id: "i6", label: "টিকা বুস্টার", detail: "১৮.২ মি." },
];

export const secondaryStrip: { id: string; title: string; src: string; time: string }[] = [
  {
    id: "r1",
    title: "নতুন উপগ্রহ ছবি ফিয়র্ড জুড়ে প্রারম্ভিক গলনের নমুনা দেখাচ্ছে",
    src: img("strip1", 200, 200),
    time: "১৮ মি",
  },
  {
    id: "r2",
    title: "নগর স্কুল বোর্ড বারোমাসি ক্যালেন্ডার পাইলট অনুমোদন করেছে",
    src: img("strip2", 200, 200),
    time: "৩২ মি",
  },
  {
    id: "r3",
    title: "গাড়ি নির্মাতারা প্রথম গাড়ির জন্য কমপ্যাক্ট ইভি প্রিভিউ করেছে",
    src: img("strip3", 200, 200),
    time: "৪৪ মি",
  },
  {
    id: "r4",
    title: "সাপ্তাহিক দীর্ঘ পাঠ: আর্কাইভ কীভাবে একটি পাড়ার গল্প বাঁচিয়েছে",
    src: img("strip4", 200, 200),
    time: "১ ঘণ্টা",
  },
];

export const footerColumns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "প্রতিষ্ঠান",
    links: [
      { label: "আমাদের সম্পর্কে", href: "#" },
      { label: "ক্যারিয়ার", href: "#" },
      { label: "বিজ্ঞাপন", href: "#" },
      { label: "প্রেস কিট", href: "#" },
    ],
  },
  {
    title: "পাঠক",
    links: [
      { label: "নিউজলেটার", href: "#" },
      { label: "ডিজিটাল সাবস্ক্রিপশন", href: "#" },
      { label: "মুদ্রিত সংস্করণ", href: "#" },
      { label: "সাহায্য কেন্দ্র", href: "#" },
    ],
  },
  {
    title: "নীতিমালা",
    links: [
      { label: "গোপনীয়তা", href: "#" },
      { label: "ব্যবহারের শর্ত", href: "#" },
      { label: "কুকি সেটিংস", href: "#" },
      { label: "অ্যাক্সেসিবিলিটি", href: "#" },
    ],
  },
  {
    title: "যোগাযোগ",
    links: [
      { label: "নিরাপদে টিপ দিন", href: "#" },
      { label: "সংশোধনী", href: "#" },
      { label: "লাইসেন্সিং", href: "#" },
      { label: "অফিসসমূহ", href: "#" },
    ],
  },
];
