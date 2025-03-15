import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';

// Define cache control headers for different asset types
const cacheControlSettings = {
  // Images - cache for 30 days
  images: 'public, max-age=2592000, stale-while-revalidate=86400',
  // Fonts - cache for 1 year
  fonts: 'public, max-age=31536000, immutable',
  // CSS and JS - cache for 7 days
  assets: 'public, max-age=604800, stale-while-revalidate=86400',
  // Default - cache for 1 day
  default: 'public, max-age=86400, stale-while-revalidate=3600',
};

// Middleware function to add cache headers to static assets
export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  // Check if the request is for a static asset
  if (
    url.includes('/_next/static/') ||
    url.includes('/static/') ||
    url.includes('/images/') ||
    /\.(ico|png|jpg|jpeg|svg|webp|avif|gif|woff|woff2|ttf|css|js)$/.test(url)
  ) {
    let cacheControl = cacheControlSettings.default;

    // Set appropriate cache control header based on asset type
    if (/\.(jpe?g|png|gif|svg|webp|avif)$/.test(url)) {
      cacheControl = cacheControlSettings.images;
    } else if (/\.(woff|woff2|ttf)$/.test(url)) {
      cacheControl = cacheControlSettings.fonts;
    } else if (/\.(css|js)$/.test(url)) {
      cacheControl = cacheControlSettings.assets;
    }

    // Create a response with cache headers
    const response = NextResponse.next();
    response.headers.set('Cache-Control', cacheControl);

    return response;
  }

  // For non-static assets, use the Clerk middleware
  // We need to return undefined to let the Clerk middleware handle the request
  return undefined;
}

// Apply the Clerk middleware after our middleware
export default clerkMiddleware();

// Export the config
export const config = {
  matcher: [
    // Include static assets
    '/_next/static/:path*',
    '/static/:path*',
    '/images/:path*',
    '/:path*.ico',
    '/:path*.png',
    '/:path*.jpg',
    '/:path*.jpeg',
    '/:path*.svg',
    '/:path*.webp',
    '/:path*.avif',
    '/:path*.gif',
    '/:path*.woff',
    '/:path*.woff2',
    '/:path*.ttf',
    '/:path*.css',
    '/:path*.js',
    // Skip Next.js internals and all static files
    '/:path*',
    // Always run for API routes
    '/api/:path*',
    '/trpc/:path*',
  ],
};
