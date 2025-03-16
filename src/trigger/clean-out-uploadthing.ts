import { logger, task } from '@trigger.dev/sdk/v3';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as fal from '@fal-ai/serverless-client';
import fetch from 'node-fetch';
import { z } from 'zod';
import { env } from '@/env.mjs';

// Initialize fal.ai client
fal.config({
  credentials: env.UPLOADTHING_SECRET, // Get this from your fal.ai dashboard
});

// Initialize S3-compatible client for Cloudflare R2
const s3Client = new S3Client({
  // How to authenticate to R2: https://developers.cloudflare.com/r2/api/s3/tokens/
  region: 'auto',
  endpoint: env.R2_ENDPOINT,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

export const FalResult = z.object({
  images: z.tuple([z.object({ url: z.string() })]),
});

export const cleanOutUploadthing = task({
  id: 'clean-out-uploadthing',
  run: async (payload: { uploadThingUrl: string }) => {
    logger.log('Moving files from UploadThing to Cloudflare R2', payload);

    // Download the uploadThing image
    const imageResponse = await fetch(payload.uploadThingUrl);
    const imageBuffer = await imageResponse.arrayBuffer().then(Buffer.from);

    // Get the file name from the uploadThingUrl
    const fileName = payload.uploadThingUrl.split('/').pop();

    // Upload to Cloudflare R2
    const r2Key = `assets/${fileName}`;
    const uploadParams = {
      Bucket: env.R2_BUCKET, // Create a bucket in your Cloudflare dashboard
      Key: r2Key,
      Body: imageBuffer,
      ContentType: 'image/png',
    };

    logger.log('Uploading file to R2', { key: r2Key });
    await s3Client.send(new PutObjectCommand(uploadParams));

    logger.log('File uploaded to R2', { key: r2Key });

    return {
      originalUrl: payload.uploadThingUrl,
      r2Url: `https://${env.R2_BUCKET}.r2.cloudflarestorage.com/${r2Key}`,
    };
  },
});
