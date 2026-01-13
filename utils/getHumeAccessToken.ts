import 'server-only';

import { fetchAccessToken } from "hume";

export const getHumeAccessToken = async () => {
  const apiKey = process.env.HUME_API_KEY;
  const secretKey = process.env.HUME_SECRET_KEY;

  console.log("Generating Hume access token...");
  console.log("API Key present:", !!apiKey);
  console.log("Secret Key present:", !!secretKey);

  if (!apiKey || !secretKey) {
    console.error("Missing HUME_API_KEY or HUME_SECRET_KEY");
    throw new Error("Missing Hume API credentials");
  }

  try {
    const accessToken = await fetchAccessToken({
      apiKey: String(apiKey),
      secretKey: String(secretKey),
    });

    if (!accessToken || accessToken === "undefined") {
      console.error("Failed to generate access token");
      return null;
    }

    console.log("Access token generated successfully, length:", accessToken.length);
    return accessToken;
  } catch (error) {
    console.error("Error generating Hume access token:", error);
    throw error;
  }
};
