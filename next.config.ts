import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    ENVIRONMENT: process.env.ENVIRONMENT,
    EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
    EMAILJS_KEY: process.env.EMAILJS_KEY
  }
};

export default nextConfig;
