// import { initializeApp } from "firebase/app";
// import { onBackgroundMessage } from "firebase/messaging/sw";

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

// const firebaseApp = initializeApp({
firebase.initializeApp({
  apiKey: "AIzaSyD1gscZzaPzqABYgNtWZPa1v4fkX064dVg",
  authDomain: "native-pushy.firebaseapp.com",
  projectId: "native-pushy",
  storageBucket: "native-pushy.firebasestorage.app",
  messagingSenderId: "436590903804",
  appId: "1:436590903804:web:2533c15151d2a54c547279",
  measurementId: "G-1NX3EHQL3B",
});



const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
