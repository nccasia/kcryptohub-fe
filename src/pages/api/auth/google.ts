import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return new Promise((resolve) => {
    if (req.method !== "POST") {
      return res.status(404).json({ message: "method not supported" });
    }

    proxy.once("proxyRes", () => {
      resolve(true);
    });

    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: false,
    });
  });
}
