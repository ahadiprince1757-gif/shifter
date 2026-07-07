const CACHE_NAME = 'Tixar-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/Tixar.jpeg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  const url = e.request.url;

  // Bypass service worker entirely in development
  if (self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1') {
    return;
  }

  // Bypass service worker for:
  // 1. Vite dev server files and hot reload scripts
  // 2. Supabase auth requests (OAuth callbacks, session checks)
  // 3. Any URL with auth-related hash fragments
  if (
    url.includes('/@vite') || 
    url.includes('/@react-refresh') || 
    url.includes('?t=') ||
    url.includes('supabase.co') ||
    url.includes('/auth/') ||
    url.includes('access_token') ||
    url.includes('refresh_token') ||
    url.includes('/rest/') ||
    url.includes('/realtime/')
  ) {
    return;
  }

  // Only handle GET requests
  if (e.request.method !== 'GET') {
    return;
  }

  // Bypass API calls entirely. The local IndexedDB architecture handles offline data now.
  if (url.includes('/api/')) {
    return;
  }

  // Cache-First (with network fallback + dynamic caching) for static assets, images, etc.
  e.respondWith(
    caches.match(e.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(e.request).then((netResponse) => {
        if (netResponse && netResponse.status === 200) {
          const responseClone = netResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseClone);
          });
        }
        return netResponse;
      }).catch((err) => {
        throw err;
      });
    })
  );
});



