import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // outputFileTracing: true,
  // serverRuntimeConfig: {
  //   PROJECT_ROOT: __dirname,
  // },
  async redirects() {
    return [
      {
        source: "/alphaday",
        destination: "https://app.alphaday.com",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
