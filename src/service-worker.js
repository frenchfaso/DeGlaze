// Define the cache name with a version
const CACHE_NAME = 'DeGlaze-v1';
// List of URLs to cache
const URLS_TO_CACHE = [
    '/',
    '/manifest.json',
    '/index.html',
    '/milligram.min.css',
    '/icon.svg',
];

// Listen for the 'install' event and cache the assets
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Open a cache and cache our files
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

// Listen for the 'activate' event to clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // If the cacheName does not match the current version, delete it
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Intercept fetch events and respond with cached content when available
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            // Return the cached response if found, otherwise fetch from the network
            return response || fetch(e.request);
        })
    );
});
