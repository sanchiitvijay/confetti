importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

let firebaseConfig={}

self.addEventListener('message', (event) => {
  if (event.data) {
    console.log("Received Firebase config in service worker:", event);

    if (event.data?.initializeFirebaseOnServiceWorker) {
      firebaseConfig = event.data;
    }

    console.log("================", firebaseConfig)
    

    // Initialize Firebase with the received config
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const messaging = firebase.messaging();

    // Handle background messages
    messaging.onBackgroundMessage((payload) => {
      console.log("[firebase-messaging-sw.js] Received background message", payload);
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
        data: {
          url: payload.data.url,
        }
      };
      self.registration.showNotification(notificationTitle, notificationOptions);
    });
  }
});


// console.log("chal jaa bkl-------------",firebaseConfig)

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// // Handle background messages
// messaging.onBackgroundMessage((payload) => {
//   console.log("[firebase-messaging-sw.js] Received background message ", payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//     data: {
//       url: payload.data.url,
//     }
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// Handle notification click events
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});

// Cache version names
const CACHE_NAME = "my-app-cache-v1";
const API_CACHE_NAME = "my-api-cache-v1";

// List of assets to cache (ensure these paths are correct)
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/manifest.json",
  "/static/js/main.3d9e04f0.js",
  "/static/css/main.bdd79025.css",
  "/static/media/c192.png",
  "/static/media/c512.png"
];



// Install event - Cache static assets
self.addEventListener("install", (event) => {
  console.log("Installing Service Worker...");
  self.skipWaiting();  // Force activation of new worker
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache and caching static assets");
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

//listening to the activate event and taking control immediately
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old cache versions
          if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
            console.log(`Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log("Service Worker: Claiming clients for immediate control...");
      return self.clients.claim();  // Force control of the page
    })
  );
});


self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Use cache-first strategy for static assets
  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request).then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      }).catch(() => {
        // Handle fetch error here
        return new Response('Error fetching resource', { status: 500 });
      })
    );
  } else if (url.pathname.startsWith("/api/")) {
    // Use network-first strategy for API requests
    event.respondWith(
      caches.open(API_CACHE_NAME).then((cache) => {
        return fetch(event.request)
          .then((response) => {
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(() => {
            return caches.match(event.request).then((cachedResponse) => {
              // Provide fallback response if cache match fails
              console.log("POSTS CACHE SE AAYI")
              return cachedResponse || new Response('Offline', { status: 503 });
            });
          });
      })
    );
  }
});

//listening for redundant service workers
self.addEventListener('redundant', () => {
  console.log('Service Worker became redundant.');
});
