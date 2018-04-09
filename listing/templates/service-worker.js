var staticCacheName = 'dogjobs-static-v1'
const urlsToCache = [
  '/',
  '/static/about.html',
  '/static/map.html',
  '/static/js/webflow.js',
  '/static/js/service-worker-controller.js',
  '/static/images/office-dog-crop.jpg',
  '/static/images/office-dog-crop-p-1080.jpeg',
  '/static/images/office-dog-crop-p-1600.jpeg',
  '/static/images/AvaSQ.jpg',
  '/static/images/AvaSQ-p-500.jpeg',
  '/static/images/RaylanFaviconBlue.png',
  '/static/css/dogfriendlyjobs.webflow.css',
  '/static/css/normalize.css',
  '/static/css/webflow.css',
];

// Caching resources during service worker install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => cache.addAll(urlsToCache))
      .then(self.skipWaiting())
  );
});

// Remove old cache during service worker activation
self.addEventListener('activate', event => {
  const currentCaches = [staticCacheName];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// Serve responses from cache or from the network. Cache resources from the network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(staticCacheName).then(cache => {
          return fetch(event.request).then(response => {
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});