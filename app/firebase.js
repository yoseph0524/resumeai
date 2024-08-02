// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRhxS92WaHhStatxEnpeW47v_7QqFPVzA",
  authDomain: "resumeai-df32c.firebaseapp.com",
  projectId: "resumeai-df32c",
  storageBucket: "resumeai-df32c.appspot.com",
  messagingSenderId: "1037069688459",
  appId: "1:1037069688459:web:33b2d2bd0d79347d9dbe8e",
  measurementId: "G-M6WCES742P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
