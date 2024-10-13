const cacheName = "pwa-conf-v2";
const staticAssets = [
    './',
    './index.html',
    './index.js',
    './manifest.webmanifest',
    './assets/cat.png',
    './android-chrome-192x192.png',
    './android-chrome-512x512.png',
    './favicon-32x32.png',
    './favicon-16x16.png',
    './offline.html',  // Adicione esta linha
];

self.addEventListener("install", async (event) => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
});
self.addEventListener("fetch", (event) => {
    const req = event.request;
    event.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(req);
    return cachedResponse || fetch(req);
}
