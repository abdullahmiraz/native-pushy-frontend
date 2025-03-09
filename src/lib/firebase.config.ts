/* eslint-disable @typescript-eslint/no-explicit-any */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getMessaging, getToken, isSupported } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyD1gscZzaPzqABYgNtWZPa1v4fkX064dVg",
//   authDomain: "native-pushy.firebaseapp.com",
//   projectId: "native-pushy",
//   storageBucket: "native-pushy.firebasestorage.app",
//   messagingSenderId: "436590903804",
//   appId: "1:436590903804:web:2533c15151d2a54c547279",
//   measurementId: "G-1NX3EHQL3B",
// };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
// export const messaging = getMessaging(app);
export let messaging: any;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app);
    }
  });
}

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });
    console.log("Token: ", token);
    return token;
  }
};
