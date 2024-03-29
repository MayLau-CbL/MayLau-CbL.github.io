'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "65546305c7790067abbe70d194c60d45",
"assets/FontManifest.json": "5a32d4310a6f5d9a6b651e75ba0d7372",
"assets/NOTICES": "aed8f221f30cd234a606e3ff3eb3c181",
"assets/assets/image/profile.png": "abd4617d8033ce66d487459ffcb610e0",
"assets/assets/lottie/9261-scroll-down.json": "7cde4936bd8fa0b15b1e97edf2bf0d24",
"assets/assets/svg/android_light.svg": "9bf8f6371811448b47184bb4676c93f1",
"assets/assets/svg/awsamplify_light.svg": "8774007f28dc9e1d987c0a9c82d9ca8a",
"assets/assets/svg/axios_light.svg": "17211896996a5b77a4df5981a06499f7",
"assets/assets/svg/bitrise_light.svg": "5725be6085972dda886caf4ff9ffbd1d",
"assets/assets/svg/codemagic_light.svg": "ccad55aa12932026dc336f7968d73b21",
"assets/assets/svg/dart_light.svg": "9bdebce5ff1d66b398d9ffccd878a5e3",
"assets/assets/svg/firebase_light.svg": "2e1d9490e25261214e88059a3e51a5af",
"assets/assets/svg/flutter_light.svg": "ea67ff4e8060634c0008c912a810338e",
"assets/assets/svg/git_light.svg": "877dcf2b9755734bc774073a5a2ecc3c",
"assets/assets/svg/githubactions_light.svg": "10f02bb8fa01aa97fc14cba6c41ddede",
"assets/assets/svg/gitlab_light.svg": "67248b2ee2d0491406b2daf9bc2080b9",
"assets/assets/svg/html5_light.svg": "60355ba2b28d03b4e5309a326de1bfde",
"assets/assets/svg/javascript_light.svg": "50b1f12e766978b8b947c986193a175b",
"assets/assets/svg/jquery_light.svg": "5891797356797a0303f3826f597659f2",
"assets/assets/svg/kotlin_light.svg": "d4ba1a83e6ec9130f561c4b709c2349b",
"assets/assets/svg/microsoftsqlserver_light.svg": "b6b13d4d41c341c0000130aec1212d72",
"assets/assets/svg/mongodb_light.svg": "6212cfc762500f22443465de26bd690a",
"assets/assets/svg/nodedotjs_light.svg": "f216a4a331e174408defcde7ff8327d1",
"assets/assets/svg/postgresql_light.svg": "ed9ed79d3ccb6257e38ce824f2523725",
"assets/assets/svg/slack_light.svg": "de2c34e147e5caf4aad90269ec19fffc",
"assets/assets/svg/strapi_light.svg": "f152c0c0aa1f8aca2def14f8414fe893",
"assets/assets/svg/subversion_light.svg": "3123eba9c9608e4097a86b6533619aab",
"assets/assets/svg/supabase_light.svg": "25157ced616ad551abdf069b9d93d0e1",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "4e20cb87b0d43808c49449ffd69b1a74",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "1f7cb220b3f5309130bd6d9ad87e0fc0",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "26f5af2d93473531f82ef5060f9c6d45",
"assets/shaders/ink_sparkle.frag": "a7c8a608aa77c7f766208da6e96289c7",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "7fb7b727aba30dee240ae372a977c36f",
"/": "7fb7b727aba30dee240ae372a977c36f",
"main.dart.js": "3f668ef9994ac48c5637decd57e1d38e",
"manifest.json": "9a800a0ac7978d54b0c3837de27e5236",
"version.json": "03f65179d0bd61b45a69d31c96389fd7"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
