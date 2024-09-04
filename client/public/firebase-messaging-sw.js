/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./firebase-messaging-sw.js":
/*!**********************************!*\
  !*** ./firebase-messaging-sw.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("importScripts(\"https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js\");\nimportScripts(\"https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js\");\n\n// Firebase configuration (directly hard-coded or retrieved from a secure method in production)\nconst firebaseConfig = {\n  apiKey: \"AIzaSyCPmZg272RLyBen2EKWXzJaaxNjX3JbBIw\",\n  authDomain: \"confetti-19b5b.firebaseapp.com\",\n  projectId: \"confetti-19b5b\",\n  storageBucket: \"confetti-19b5b.appspot.com\",\n  messagingSenderId: \"991386176489\",\n  appId: \"1:991386176489:web:647695417cdd66b19b1978\"\n};\n\n// Initialize Firebase\nfirebase.initializeApp(firebaseConfig);\nconst messaging = firebase.messaging();\n\n// Handle background messages\nmessaging.onBackgroundMessage(payload => {\n  console.log(\"[firebase-messaging-sw.js] Received background message \", payload);\n  const notificationTitle = payload.notification.title;\n  const notificationOptions = {\n    body: payload.notification.body,\n    icon: payload.notification.image,\n    data: {\n      url: payload.data.url\n    }\n  };\n  self.registration.showNotification(notificationTitle, notificationOptions);\n});\n\n// Handle notification click events\nself.addEventListener('notificationclick', event => {\n  console.log('Notification clicked:', event);\n  event.notification.close();\n  event.waitUntil(clients.openWindow(event.notification.data.url));\n});\n\n// Cache version names\nconst CACHE_NAME = \"my-app-cache-v1\";\nconst API_CACHE_NAME = \"my-api-cache-v1\";\n\n// List of assets to cache (ensure these paths are correct)\nconst STATIC_ASSETS = [\"/\", \"/index.html\", \"/favicon.ico\", \"/manifest.json\", \"/static/js/main.3d9e04f0.js\", \"/static/css/main.bdd79025.css\", \"/static/media/c192.png\", \"/static/media/c512.png\"];\n\n// Install event - Cache static assets\nself.addEventListener(\"install\", event => {\n  event.waitUntil(caches.open(CACHE_NAME).then(cache => {\n    console.log(\"Opened cache and caching static assets\");\n    return cache.addAll(STATIC_ASSETS);\n  }));\n});\nself.addEventListener(\"fetch\", event => {\n  const url = new URL(event.request.url);\n\n  // Use cache-first strategy for static assets\n  if (STATIC_ASSETS.includes(url.pathname)) {\n    event.respondWith(caches.match(event.request).then(cachedResponse => {\n      return cachedResponse || fetch(event.request).then(response => {\n        return caches.open(CACHE_NAME).then(cache => {\n          cache.put(event.request, response.clone());\n          return response;\n        });\n      });\n    }).catch(() => {\n      // Handle fetch error here\n      return new Response('Error fetching resource', {\n        status: 500\n      });\n    }));\n  } else if (url.pathname.startsWith(\"/api/\")) {\n    // Use network-first strategy for API requests\n    event.respondWith(caches.open(API_CACHE_NAME).then(cache => {\n      return fetch(event.request).then(response => {\n        cache.put(event.request, response.clone());\n        return response;\n      }).catch(() => {\n        return caches.match(event.request).then(cachedResponse => {\n          // Provide fallback response if cache match fails\n          console.log(\"POSTS CACHE SE AAYI\");\n          return cachedResponse || new Response('Offline', {\n            status: 503\n          });\n        });\n      });\n    }));\n  }\n});\n\n//# sourceURL=webpack:///./firebase-messaging-sw.js?");

/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi ./firebase-messaging-sw.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./firebase-messaging-sw.js */\"./firebase-messaging-sw.js\");\n\n\n//# sourceURL=webpack:///multi_./firebase-messaging-sw.js?");

/***/ })

/******/ });