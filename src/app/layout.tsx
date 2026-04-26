import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "রাজশাহী নিউজ ২৪ — জাতীয় ও বিশ্ব প্রতিবেদন",
  description:
    "জাতীয়, বাণিজ্য, বিশ্ব, খেলা ও সংস্কৃতি — আধুনিক সংবাদ প্রচ্ছদ।",
  openGraph: {
    title: "রাজশাহী নিউজ ২৪",
    description: "স্পষ্ট প্রতিবেদন, পূর্ণ চিত্র।",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${notoSansBengali.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col text-[15px] leading-relaxed text-foreground">
        {children}
      </body>
    </html>
  );
}
