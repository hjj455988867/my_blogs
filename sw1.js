self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('v2').then(function(cache) {
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


  self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
      // caches.match() always resolves
      // but in case of success response will have value
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request).then(function (response) {
          // response may be used only once
          // we need to save clone to put one copy in cache
          // and serve second one
          let responseClone = response.clone();
          
          caches.open('v1').then(function (cache) {
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
    var cacheWhitelist = ['v2'];
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