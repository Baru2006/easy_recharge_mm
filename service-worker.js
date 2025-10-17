const CACHE_NAME = "easyrecharge-cache-v1";
const ASSETS = [
  "/easy_recharge_mm/",
  "/easy_recharge_mm/index.html",
  "/easy_recharge_mm/order.html",
  "/easy_recharge_mm/pay.html",
  "/easy_recharge_mm/status.html",
  "/easy_recharge_mm/services.html",
  "/easy_recharge_mm/faq.html",
  "/easy_recharge_mm/privacy.html",
  "/easy_recharge_mm/manifest.json",
  "/easy_recharge_mm/icons/icon-192.png",
  "/easy_recharge_mm/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }
  event.respondWith(
    fetch(event.request)
      .then(response => {
        return response;
      })
      .catch(() => caches.match(event.request).then(res => res || caches.match("/easy_recharge_mm/index.html")))
  );
});
