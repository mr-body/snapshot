const CACHE_NAME = 'firebase-movies-cache-v1';

const urlsToCache = [
    '/',
    '/manifest.webmanifest',
    '/assets/cat.png',
    '/android-chrome-192x192.png',
    '/android-chrome-512x512.png',
    '/favicon-32x32.png',
    '/favicon-16x16.png',
    '/offline.html',  // Adicione esta linha
];

// Instalação do Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Busca no cache ou na rede
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Se a resposta não for encontrada no cache, retornar uma página offline
                return response || fetch(event.request).catch(() => {
                    return caches.match('/offline.html');
                });
            })
    );
}); 

// Atualizando o Service Worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
