import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "i.pravatar.cc", pathname: "/**" },
    ],
  },
  // Dev: browser is HTTPS (Facebook) but API is HTTP — proxy so there is no mixed content.
  async rewrites() {
    if (process.env.NODE_ENV !== "development") {
      return [];
    }
    return [
      {
        source: "/_pnews_api/:path*",
        destination: "http://127.0.0.1:5000/:path*",
      },
    ];
  },
};

export default nextConfig;
