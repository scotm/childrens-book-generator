import { env } from '@/env.mjs';
import { UTApi } from 'uploadthing/server';

export const utapi = new UTApi({
  token: env.UPLOADTHING_TOKEN,
});

type UploadThingFileKey = Awaited<ReturnType<typeof utapi.listFiles>>['files'][number]['key'];

/**
 * Retrieves the URL of a file stored in UploadThing.
 *
 * @param {UploadThingFileKey} fileKey - The unique key associated with the file.
 * @returns {Promise<string>} A promise that resolves to the URL of the file.
 */
export const getFileUrl = async (fileKey: UploadThingFileKey): Promise<string> => {
  return `https://${env.UPLOADTHING_APP_ID}.ufs.sh/f/${fileKey}`;
};
