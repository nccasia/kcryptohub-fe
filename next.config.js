/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "img.shgstatic.com",
      "avatars.githubusercontent.com",
      "www.google.com",
      "img.youtube.com",
      "localhost",
      "goodfirms-prod.s3.amazonaws.com",
      "static2.clutch.co",
      "clutch.co",
      "www.goodfirms.co",
      "172.16.100.186",
      "app.kryptohub.co",
      "vinasa.org.vn",
      "www.vinasa.org.vn",
    ],
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
