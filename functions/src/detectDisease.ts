// functions/src/detectDisease.ts

import { onCall } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as logger from "firebase-functions/logger";

setGlobalOptions({ region: "asia-southeast1" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const detectDisease = onCall(async (req) => {
  try {
    const base64Image = req.data.imageBase64;
    if (!base64Image) {
      throw new Error("No image data received");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      },
      {
        text: `This image is of a diseased crop. Identify the disease or pest, specify the cause, and suggest an affordable remedy easily available in Indian local markets. Keep the response short and in simple Hindi.`,
      },
    ]);

    const response = await result.response;
    const text = response.text();

    return { result: text };
  } catch (error: any) {
    logger.error("Disease detection error", error);
    return { error: error.message || "Failed to process image." };
  }
});
