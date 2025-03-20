import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names using clsx and tailwind-merge.
 * This utility function merges Tailwind CSS classes while properly handling conflicts.
 *
 * @param {...ClassValue[]} inputs - Array of class names or class value objects to be merged
 * @returns {string} A string of merged and deduplicated class names
 *
 * @example
 * cn('px-2 bg-red', 'px-4') // Returns 'bg-red px-4'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a promise that resolves after a specified delay.
 * Useful for adding delays in async operations or creating artificial pauses.
 *
 * @param {number} ms - The delay duration in milliseconds
 * @returns {Promise<void>} A promise that resolves after the specified delay
 *
 * @example
 * await sleep(1000); // Waits for 1 second
 */
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Valid MIME types for image files supported by the application.
 */
type ContentType =
  | 'image/jpeg'
  | 'image/png'
  | 'image/gif'
  | 'image/webp'
  | 'image/svg+xml'
  | 'image/bmp'
  | 'image/tiff';

/**
 * Determines the MIME content type based on a file's extension.
 *
 * @param {string} filename - The name of the file including its extension
 * @returns {ContentType} The corresponding MIME type for the file
 * @throws {Error} If the file extension is not recognized
 *
 * @example
 * getContentTypeFromFilename('image.jpg') // Returns 'image/jpeg'
 * getContentTypeFromFilename('icon.png') // Returns 'image/png'
 */
export const getContentTypeFromFilename = (filename: string): ContentType => {
  const extension = filename.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    case 'svg':
      return 'image/svg+xml';
    case 'bmp':
      return 'image/bmp';
    case 'tiff':
    case 'tif':
      return 'image/tiff';
    default:
      throw new Error(`Unknown file extension: ${extension}`);
  }
};
