import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // permite <Image src="https://res.cloudinary.com/..." />
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
