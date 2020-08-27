importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

var urlsToCache = [
  { url: '/', revision: '1' },
  { url: '/manifest.json',revision:'1'},
  { url: '/icon.png', revision: '1' },
  { url: '/icon_192x192.png', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/db.js', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/tim.html', revision: '1' },
  { url: '/pages/klasemen.html',revision:'1'},
  { url: '/pages/saved.html',revision:'1'},
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/register-worker-index.js', revision: '1' },
  { url: '/js/register-worker.js', revision: '1' }
]

if(workbox){  
  workbox.precaching.precacheAndRoute(urlsToCache, {
  ignoreUrlParametersMatching: [/.*/]
});
  workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images-cache',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ]
    })
  );
  
  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
  )

  // Caching Google Fonts
  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );

  // Caching Pages
  workbox.routing.registerRoute(
    new RegExp('/pages/'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'pages'
      })
  );
}

self.addEventListener('push', event => {
  var body;

  console.log(event);

  if(event.data) {
    body = event.data.text()
  } else {
    body = "This is push message"
  }

  var options = {
    body: body,
    icon: '/icon.png',
    vibrate: [500, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  }

  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});