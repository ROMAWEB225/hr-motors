const CACHE_NAME = "hr-motors-v1";
const urlsToCache = [
  "/index.html",
  "/manifest.json",
  // Ajoutez ici d'autres ressources si nécessaires (polices, icônes)
];

// Installation : mise en cache des ressources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

// Récupération : répondre avec le cache puis réseau
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request)),
  );
});

// Activation : nettoyer les anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) return caches.delete(name);
        }),
      );
    }),
  );
});
