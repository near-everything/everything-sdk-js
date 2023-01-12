import { getAccessToken } from "@auth0/nextjs-auth0";
import httpProxyMiddleware from "next-http-proxy-middleware";

// Middleware to automatically attach access tokens to file upload requests going to the API
export default async function handler(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  
  return httpProxyMiddleware(req, res, {
    target: process.env.EVERYTHING_API,
    changeOrigin: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
