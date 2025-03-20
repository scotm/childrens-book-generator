import { logger, task } from "@trigger.dev/sdk/v3";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import * as fal from "@fal-ai/serverless-client";
import fetch from "node-fetch";
import { z } from "zod";
import { env } from "@/env.mjs";

// Initialize fal.ai client
fal.config({
  credentials: env.FAL_KEY, // Get this from your fal.ai dashboard
});

// Initialize S3-compatible client for Cloudflare R2
const s3Client = new S3Client({
  // How to authenticate to R2: https://developers.cloudflare.com/r2/api/s3/tokens/
  region: "auto",
  endpoint: env.R2_ENDPOINT,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

export const FalResult = z.object({
  images: z.tuple([z.object({ url: z.string() })]),
});

export const falAiImageToCartoon = task({
  id: "fal-ai-image-to-cartoon",
  run: async (payload: { imageUrl: string; fileName: string }) => {
    logger.log("Converting image to cartoon", payload);

    // Convert image to cartoon using fal.ai
    const result = await fal.subscribe("fal-ai/flux/dev/image-to-image", {
      input: {
        prompt:
          "Turn the image into a cartoon in the style of a Pixar character",
        image_url: payload.imageUrl,
      },
      onQueueUpdate: (update) => {
        logger.info("Fal.ai processing update", { update });
      },
    });

    const $result = FalResult.parse(result);
    const [{ url: cartoonImageUrl }] = $result.images;

    // Download the cartoon image
    const imageResponse = await fetch(cartoonImageUrl);
    const imageBuffer = await imageResponse.arrayBuffer().then(Buffer.from);

    // Upload to Cloudflare R2
    const r2Key = `cartoons/${payload.fileName}`;
    const uploadParams = {
      Bucket: env.R2_AI_BUCKET, // Create a bucket in your Cloudflare dashboard
      Key: r2Key,
      Body: imageBuffer,
      ContentType: "image/png",
    };

    logger.log("Uploading cartoon to R2", { key: r2Key });
    await s3Client.send(new PutObjectCommand(uploadParams));

    logger.log("Cartoon uploaded to R2", { key: r2Key });

    return {
      originalUrl: payload.imageUrl,
      cartoonUrl: `File uploaded to storage at: ${r2Key}`,
    };
  },
});
