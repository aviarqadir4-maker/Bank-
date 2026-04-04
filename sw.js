const CACHE_NAME = "battery-v1";
const urlsToCache = [
  "./",
  "./index.html"
];

// لێرەدا فایلەکان پاشەکەوت دەکرێن
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // ئەگەر تەنها index.html و sw.js ت هەیە، تەنها ئەوانە بنووسە
      return cache.addAll(urlsToCache);
    })
  );
});

// لێرەدا دەڵێین ئەگەر خەت نەبوو، فایلەکە لەناو مۆبایلەکە خۆی بخوێنەوە
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
