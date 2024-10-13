const cacheName = "pwa-conf-v3";
const staticAssets = [
  "./offline.html"
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
  if (cachedResponse) return cachedResponse;
  const networkResponse = await fetch(req);
  if (!networkResponse.ok) {
    const offlineResponse = await cache.match("./offline.html");
    if (offlineResponse) return offlineResponse;
  }
  return networkResponse;
}
