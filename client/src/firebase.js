import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId:process.env.REACT_APP_FIREBASE_APP_ID 
}

export const app = initializeApp(firebaseConfig);
export const messaging= getMessaging(app);
export const auth=getAuth();
export const db=getFirestore(app);


document.addEventListener('DOMContentLoaded', function(){
  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
        const postMsgObj = {
          initializeFirebaseOnServiceWorker: true,
          ...firebaseConfig
        }

        registration.active?.postMessage(postMsgObj);
      })
      .catch(function(error) {
        console.error('Service Worker registration failed:', error);
      });
  }
});