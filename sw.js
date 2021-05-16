
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v5').then(function(cache) {
      return cache.addAll([
        '/my_blogs/',
        '/my_blogs/index.html',
        '/my_blogs/favicon.ico',
      ]);
    })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        let responseClone = response.clone();
        
        caches.open('v5').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return console.log('报错了');
      });
    }
  }));
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['v5'];
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});