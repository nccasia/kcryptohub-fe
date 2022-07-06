/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "img.shgstatic.com",
      "avatars.githubusercontent.com",
      "www.google.com",
      "kryptohub-be.herokuapp.com",
      "kryptohub-fe.herokuapp.com",
      "img.youtube.com",
      "localhost",
    ],
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
