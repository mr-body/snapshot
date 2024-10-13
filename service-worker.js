const cacheName = "pwa-conf-v9";
const staticAssets = [
  "./",
  "./index.html",
  "./index.js",
  "./assets/cat.png",
  "./offline.html",
  "./service-worker.js"
];

self.addEventListener("install", async (event) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  event.respondWith(
    cacheFirst(req).catch(() => fetchOfflinePage())
  );
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(req);
  return cachedResponse || fetch(req);
}

async function fetchOfflinePage() {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match("./offline.html");
  return cachedResponse;
}
