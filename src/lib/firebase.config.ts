// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1gscZzaPzqABYgNtWZPa1v4fkX064dVg",
  authDomain: "native-pushy.firebaseapp.com",
  projectId: "native-pushy",
  storageBucket: "native-pushy.firebasestorage.app",
  messagingSenderId: "436590903804",
  appId: "1:436590903804:web:2533c15151d2a54c547279",
  measurementId: "G-1NX3EHQL3B",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
