import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";

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

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = "";

      proxyRes.on("data", function (chunk) {
        body += chunk;
      });

      proxyRes.on("end", function () {
        try {
          const { access_token } = JSON.parse(body);
          if (access_token) {
            localStorage.setItem("access_token", access_token);
          }
          (res as NextApiResponse).status(200).json({ access_token });
        } catch (error) {
          (res as NextApiResponse).status(500).json({ error });
        }

        resolve(true);
      });
    };

    proxy.once("proxyRes", handleLoginResponse);

    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
}
