const CACHE_NAME = 'knee-rehab-v2';
const ASSETS = [
  '/index.html',
  '/manifest.json',
  '/videos/001-04-Isometric_Quads_L_1-1.mp4',
  '/videos/002-05-Static_Hamstrings_L_1-1.mp4',
  '/videos/003-06-Isometric_Glutes_L_1-1.mp4',
  '/videos/008-13-Clamshells-L 1-2.mp4',
  '/videos/013-19-Side Lying Hip Abduction-L 2-1.mp4',
  '/videos/021-27-SLR with Hip Abduction-M 1-4.mp4'
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
