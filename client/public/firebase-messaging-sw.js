importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);




const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId:process.env.REACT_APP_FIREBASE_APP_ID 
}

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
    data: {
      url:payload.data.url,
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked:', event);
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});



// Cache version names
const CACHE_NAME = "my-app-cache-v1";
const API_CACHE_NAME = "my-api-cache-v1";

// List of assets to cache-> relative to build directory
const STATIC_ASSETS = [
  "/",  
  "/index.html",
  "/favicon.ico",
  "/manifest.json",  
  "/static/js/main.738766e1.js",
  "/static/css/main.bdd79025.css",

];

// Install event - Cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache and caching static assets");
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Fetch event - Serve from cache, then update cache
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
            return caches.match(event.request);
          });
      })
    );
  }
});