import { logger, task } from "@trigger.dev/sdk/v3";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fetch from "node-fetch";
import { env } from "@/env.mjs";
import { getFileUrl, utapi } from "@/server/uploadthing";
import { getContentTypeFromFilename } from "@/lib/utils";

// Initialize S3-compatible client for Cloudflare R2
const s3Client = new S3Client({
  region: "auto",
  endpoint: env.R2_ENDPOINT,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

export const cleanOutUploadthing = task({
  id: "clean-out-uploadthing",
  run: async (payload: { uploadThingUrl: string }) => {
    logger.log("Moving files from UploadThing to Cloudflare R2", payload);

    logger.log("Moving files from UploadThing to Cloudflare R2");

    const uploadthingFiles = await utapi.listFiles({
      limit: 10,
    });
    const uploadedFiles = uploadthingFiles.files.filter(
      (file) => file.status === "Uploaded"
    );
    console.log(uploadedFiles);

    const returnData: { originalUrl: string; r2Url: string }[] = [];

    for (const file of uploadedFiles) {
      const fileUrl = await getFileUrl(file.key);
      const imageResponse = await fetch(fileUrl);
      const imageBuffer = await imageResponse.arrayBuffer().then(Buffer.from);
      const fileName = file.name;

      const contentType = getContentTypeFromFilename(fileName);

      // Upload to Cloudflare R2
      const r2Key = `assets/${fileName}`;
      const uploadParams = {
        Bucket: env.R2_BUCKET, // Create a bucket in your Cloudflare dashboard
        Key: r2Key,
        Body: imageBuffer,
        ContentType: contentType,
      };
      logger.log("Uploading file to R2", { key: r2Key });
      await s3Client.send(new PutObjectCommand(uploadParams));
      logger.log("File uploaded to R2", { key: r2Key });

      returnData.push({
        originalUrl: fileUrl,
        r2Url: `https://${env.R2_BUCKET}.r2.cloudflarestorage.com/${r2Key}`,
      });
    }

    return returnData;
  },
});
