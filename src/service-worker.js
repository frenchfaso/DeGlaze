// Define the cache name with a version
const CACHE_NAME = 'v 1.1';
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
            return cache.addAll(URLS_TO_CACHE)  // Return the promise from addAll, ensuring all assets are cached before proceeding
                .then(() => {
                    // Once all files are cached, skip waiting to activate this service worker
                    return self.skipWaiting(); // Return the promise from skipWaiting to ensure it completes
                });
        })
    );
});

// Listen for the 'activate' event to clean up old caches and take control of the clients
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            // Delete all caches that are not the current cache
            return Promise.all(
                cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
                    .map(cacheName => caches.delete(cacheName))
            );
        }).then(() => {
            // After cleaning up old caches, claim clients so the new service worker takes control immediately
            return clients.claim();
        }).then(() => {
            // After claiming the clients, log the current cache name to the console
            console.log('Active service worker with CACHE_NAME:', CACHE_NAME);
        })
    );
});

// Intercept fetch events and respond with cached content when available
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then((response) => {
                // Return the cached response if found
                return response || fetch(e.request).then((fetchResponse) => {
                    // Optionally cache new fetched responses dynamically
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(e.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            })
    );
});

self.addEventListener('message', event => {
    if (event.data === 'getCacheName') {
        self.clients.matchAll().then(all => all.forEach(client => {
            client.postMessage({cacheName: CACHE_NAME});
        }));
    }
});