const CACHE_NAME = 'knee-rehab-v1';
const ASSETS = [
  '/index.html',
  '/manifest.json',
  '/videos/001-04-Isometric_Quads_L_1-1.mp4',
  '/videos/002-05-Static_Hamstrings_L_1-1.mp4',
  '/videos/003-06-Isometric_Glutes_L_1-1.mp4'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
