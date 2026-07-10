/**
 * Dummy Service Worker to prevent 404/routing crashes
 * This file is requested by some browsers/extensions and can trigger 
 * internal Next.js/Node.js streaming errors if it hits the dynamic router.
 */
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  // Clear any old caches if needed
});
