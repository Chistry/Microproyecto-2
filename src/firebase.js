// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvaT1KWLetFxuZWe3rIIU-R8O6bnvjA3E",
  authDomain: "microproyecto2-34842-5633a.firebaseapp.com",
  projectId: "microproyecto2-34842",
  storageBucket: "microproyecto2-34842.appspot.com",
  messagingSenderId: "682396719605",
  appId: "1:682396719605:web:f111942b183b92137f68bc",
  measurementId: "G-H8W0VPR9TG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);