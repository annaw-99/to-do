const CACHE_NAME = 'todo-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  '/static/css/main.*.css',
  '/static/js/main.*.js'
];

// Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Cached offline page during install');
      return cache.addAll(urlsToCache);
    })
  );
});

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        // If response was successful, clone it and store it in the cache
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(function() {
        // If the network request failed, try to get it from the cache
        return caches.match(event.request);
      })
  );
}); 