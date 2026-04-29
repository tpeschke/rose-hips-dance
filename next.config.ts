import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    ENVIRONMENT: process.env.ENVIRONMENT
  }
};

export default nextConfig;
