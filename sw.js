self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        return cache.addAll([
          '/sw-test/',
          '/sw-test/index.html',
          '/sw-test/js/jquery-3.5.1.min.js',
          '/sw-test/img/background-cover.jpg',
          '/sw-test/img/homebg.jpg',
          '/sw-test/css/index.css',
          '/sw-test/css/reset.css'
        ]);
      })
    );
  });