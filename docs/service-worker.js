// Define the cache name with a version
const CACHE_NAME = 'DeGlaze-v1';
// List of URLs to cache
const URLS_TO_CACHE = [
    "https://frenchfaso.github.io/DeGlaze/",
    "https://frenchfaso.github.io/DeGlaze/manifest.json",
    "https://frenchfaso.github.io/DeGlaze/index.html",
    "https://frenchfaso.github.io/DeGlaze/milligram.min.css",
    "https://frenchfaso.github.io/DeGlaze/icon.svg",
    "https://frenchfaso.github.io/DeGlaze"
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

