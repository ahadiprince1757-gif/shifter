const CACHE_NAME = 'Tixar-v10';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/Tixar.jpeg'
];

self.addEventListener('install', (e) => {
  self.skipWaiting(); // Force the waiting service worker to become the active service worker
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    }).then(() => self.clients.claim()) // Claim all clients immediately
  );
});

self.addEventListener('fetch', (e) => {
  const url = e.request.url;

  // Bypass service worker entirely in development
  if (self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1') {
    return;
  }

  // Bypass service worker for:
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

  if (e.request.method !== 'GET') {
    return;
  }

  if (url.includes('/api/')) {
    return;
  }

  e.respondWith(
    (async () => {
      // Network-first for HTML files/navigation to ensure we get the latest asset hashes
      if (e.request.mode === 'navigate' || url.endsWith('.html') || url.endsWith('/')) {
        try {
          const netResponse = await fetch(e.request);
          if (netResponse && netResponse.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(e.request, netResponse.clone());
          }
          return netResponse;
        } catch {
          const cachedResponse = await caches.match(e.request);
          if (cachedResponse) return cachedResponse;
          // If no cached HTML, return a basic offline page
          return new Response(
            '<html><body><h1>You are offline</h1><p>Please check your internet connection and try again.</p></body></html>',
            { headers: { 'Content-Type': 'text/html' } }
          );
        }
      }

      // Cache-first for JS/CSS/Images with graceful offline fallback
      const cachedResponse = await caches.match(e.request);
      if (cachedResponse) {
        return cachedResponse;
      }

      try {
        const netResponse = await fetch(e.request);
        if (netResponse && netResponse.status === 200) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(e.request, netResponse.clone());
        }
        return netResponse;
      } catch {
        // Network failed and no cache — return a 503 instead of throwing
        return new Response('Service Unavailable', { status: 503, statusText: 'Offline' });
      }
    })()
  );
});



