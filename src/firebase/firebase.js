// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1KbHyo_ZDtH-5KH9n9AycoYZK-z3qXUY",
  authDomain: "sone-taran-f66f4.firebaseapp.com",
  projectId: "sone-taran-f66f4",
  storageBucket: "sone-taran-f66f4.firebasestorage.app",
  messagingSenderId: "520802685036",
  appId: "1:520802685036:web:32ebe1246b8d5906e84849",
  measurementId: "G-YEFXVFJRW2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);