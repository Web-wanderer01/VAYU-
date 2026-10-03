self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('vayu-offline').then((cache) => {
      return cache.addAll([
        '/',
        '/offline',
        '/favicon.ico',
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => {
        return caches.match('/offline');
      })
    );
  }
});
