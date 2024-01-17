var CACHE_NAME = 'rustyimagetools.github.io-v2';
var urlsToCache = [
  '/',
  '/js/app.js',
  '/js/fileHandlers.js',
  '/js/imageProcessing.js',
  '/js/ui.js',
  '/rust_image_resizer.js',
  '/rust_image_resizer_bg.wasm',
  '/rusty.webp',
  'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});
