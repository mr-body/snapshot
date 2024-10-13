const cacheName = "pwa-conf-v1";
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
    './offline.html',
];

self.addEventListener("install", async (event) => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
});

self.addEventListener("fetch", (event) => {
    const req = event.request;
    event.respondWith(networkFirst(req));
});

async function networkFirst(req) {
    const cache = await caches.open(cacheName);
    try {
        const response = await fetch(req);
        await cache.put(req, response.clone());
        return response;
    } catch (error) {
        return await cache.match('./offline.html');
    }
}

