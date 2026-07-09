const CACHE_NAME = 'Tixar-v3';
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
        } catch (err) {
          const cachedResponse = await caches.match(e.request);
          if (cachedResponse) return cachedResponse;
          throw err;
        }
      }

      // Cache-first for JS/CSS/Images
      const cachedResponse = await caches.match(e.request);
      if (cachedResponse) {
        return cachedResponse;
      }
      
      const netResponse = await fetch(e.request);
      if (netResponse && netResponse.status === 200) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(e.request, netResponse.clone());
      }
      return netResponse;
    })()
  );
});



