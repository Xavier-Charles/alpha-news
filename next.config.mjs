/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
