self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        return cache.addAll([
          '/my_blogs/',
          '/my_blogs/index.html',
          '/my_blogs/app.js',
          '/my_blogs/js/jquery-3.5.1.min.js',
          '/my_blogs/img/background-cover.jpg',
          '/my_blogs/img/homebg.jpg',
          '/my_blogs/css/index.css',
          '/my_blogs/css/reset.css',
        ]);
      })
    );
  });