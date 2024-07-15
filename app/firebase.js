// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCinOzAIkGDDQDAFaeE_-niQSBHGwHczeU",
  authDomain: "nwitter-6bec6.firebaseapp.com",
  projectId: "nwitter-6bec6",
  storageBucket: "nwitter-6bec6.appspot.com",
  messagingSenderId: "881432177546",
  appId: "1:881432177546:web:809fbb8b3079dff8557673",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
