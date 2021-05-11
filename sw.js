self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        return cache.addAll([
          '/my_blogs/',
          '/my_blogs/index.html',
          '/my_blogs/app.js'
        ]);
      })
    );
  });