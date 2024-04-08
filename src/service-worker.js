const CACHE_NAME = 'v1';
const URLS_TO_CACHE = [
    '/',
    'index.html',
    'manifest.json',
    'icon.svg',
    'https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.min.css'
];
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('my-cache').then((cache) => cache.addAll(URLS_TO_CACHE)),
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});
