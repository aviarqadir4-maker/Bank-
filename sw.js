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
// فەنکشنێک بۆ نیشاندانی ڕێژەی شەحن لەسەر ئایکۆنی ئەپەکە
function updateBadge() {
    if ('setAppBadge' in navigator) {
        navigator.getBattery().then(battery => {
            const level = Math.round(battery.level * 100);
            // نیشاندانی ژمارەکە لەسەر ئایکۆنەکە
            navigator.setAppBadge(level).catch((error) => {
                console.error("Badge error:", error);
            });
        });
    }
}

// نوێکردنەوەی ژمارەکە کاتێک پاتری دەگۆڕێت
navigator.getBattery().then(battery => {
    battery.addEventListener('levelchange', () => {
        updateBadge();
    });
});

// بانگکردنی فەنکشنەکە بۆ یەکەمجار
updateBadge();
