const CACHE_NAME = 'knee-rehab-v3';
const ASSETS = [
  '/index.html',
  '/manifest.json',
  '/videos/001-04-Isometric_Quads_L_1-1.mp4',
  '/videos/002-05-Static_Hamstrings_L_1-1.mp4',
  '/videos/003-06-Isometric_Glutes_L_1-1.mp4',
  '/videos/008-13-Clamshells-L 1-2.mp4',
  '/videos/013-19-Side Lying Hip Abduction-L 2-1.mp4',
  '/videos/021-27-SLR with Hip Abduction-M 1-4.mp4',
  '/videos/068-78-Standing_Knee_Flexion-L_4-2.mp4',
  '/videos/085_99-Bilateral_Calf_Raises_No_Support-L_6-2.mp4',
  '/videos/087-101-Standing_Hip_Extension__no_toe_down_between-L_6-2.mp4',
  '/videos/062-70-Supported_Hip_Abduction-L_4-1.mp4',
  '/videos/083-96-Marching_without_hands-L_6-2_.mp4',
  '/videos/084_97-Single_Leg_Stand_No_Support_-L_6-1.mp4',
  '/videos/088-102-Hip_Abduction_with_Band-M_1-2.mp4',
  '/videos/089-103-Hip_Extension_with_Band-M_1-2.mp4',
  '/videos/101_-_115_One_Leg_Heel_Raise_M1-6.mp4',
  '/videos/108_-_Take_122_Sidestep_with_Band_M1-8.mp4',
  '/videos/120_-_Diagonal_Hip_Abduction_with_Band_M1-12.mp4',
  '/videos/093_-_107_Sit_to_Stand_No_Hands_M1-3__1_.mp4',
  '/videos/117_-_747_with_Support_M1-12.mp4',
  '/videos/110_-_Take_124_Forward_Step_Ups_M1-9.mp4',
  '/videos/111_-_Take_125_Side_Step_Ups_M_1-11.mp4'
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
