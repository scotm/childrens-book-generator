import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { logger, task } from '@trigger.dev/sdk/v3';

import { env } from '@/env.mjs';
import { getContentTypeFromFilename } from '@/lib/utils';
import { getFileUrl, utapi } from '@/server/uploadthing';
import fetch from 'node-fetch';

// Initialize S3-compatible client for Cloudflare R2
const s3Configuration = {
  region: 'auto',
  endpoint: env.R2_ENDPOINT,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
};

type OutputFormat = {
  originalUrl: string;
  newUrl: string;
  r2Url: string;
};

export const cleanOutUploadthing = task({
  id: 'clean-out-uploadthing',
  machine: 'micro',
  run: async (payload: { uploadThingUrl: string }) => {
    logger.log('Moving files from UploadThing to Cloudflare R2', payload);
    const s3Client = new S3Client(s3Configuration);

    const uploadthingFiles = await utapi.listFiles({
      limit: 100,
    });
    const uploadedFiles = uploadthingFiles.files.filter((file) => file.status === 'Uploaded');

    const returnData: OutputFormat[] = [];

    for (const file of uploadedFiles) {
      const fileUrl = await getFileUrl(file.key);
      const imageResponse = await fetch(fileUrl);
      const imageBuffer = await imageResponse.arrayBuffer().then(Buffer.from);
      const fileName = file.name;

      const contentType = getContentTypeFromFilename(fileName);

      const r2Key = `${fileName}`;
      const uploadParams = {
        Bucket: env.R2_BUCKET, // Create a bucket in your Cloudflare dashboard
        Key: r2Key,
        ContentType: contentType,
        Body: imageBuffer,
      };
      logger.log('uploadParams', uploadParams);

      const upload = new Upload({
        client: s3Client,
        params: uploadParams,
      });
      logger.log('Uploading file to R2', { key: r2Key });
      const response = await upload.done();
      logger.log('response', { ...response });
      // Upload to Cloudflare R2

      returnData.push({
        originalUrl: fileUrl,
        newUrl: response.Location ?? '',
        r2Url: `https://${env.R2_BUCKET}.r2.cloudflarestorage.com/${r2Key}`,
      });
    }

    return returnData;
  },
});
