const CACHE_NAME = 'financas-v1';
const assets = [
  './index.html',
  './manifest.json'
];

// Instala o Service Worker e guarda os ficheiros base
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Interceta os pedidos e serve do cache se estiver offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});