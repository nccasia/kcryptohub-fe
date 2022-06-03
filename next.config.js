/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "img.shgstatic.com",
      "avatars.githubusercontent.com",
    ],
  },
};

module.exports = nextConfig;
