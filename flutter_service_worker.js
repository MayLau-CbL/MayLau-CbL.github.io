'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "1aa8ecbb0060437bf097e7e064fccccd",
"assets/assets/image/brightness.png": "151c29b927bf44b0e3fc6d426a05fff0",
"assets/assets/image/jp_rail.jpg": "f4c6ea569839e41e4679f68028a89a52",
"assets/assets/image/me.jpg": "4d3ff13b04be33d4837eca7e1f99bcbc",
"assets/assets/image/speed_dial.png": "9aadd23678dded094fb05d6dfa34bb3b",
"assets/assets/image/table_ori.png": "374103a3c50d949ca30f514c4a9e06ea",
"assets/FontManifest.json": "18eda8e36dfa64f14878d07846d6e17f",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/LICENSE": "ecf948e199879da9e534b5fe650e27e4",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "5a37ae808cf9f652198acde612b5328d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "2bca5ec802e40d3f4b60343e346cedde",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "2aa350bd2aeab88b601a593f793734c0",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "cdf6d15eb8644ddadb1b116e0c0e8004",
"/": "cdf6d15eb8644ddadb1b116e0c0e8004",
"main.dart.js": "796dc0913cfbd03e70741f0694c4d712",
"manifest.json": "f779ca349dfce6f4b3016b8340f98e70"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
