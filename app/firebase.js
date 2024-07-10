// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbqWB1VizMAhatdmLBVpD1kkg8fDPIRBs",
  authDomain: "resumeai-e963a.firebaseapp.com",
  projectId: "resumeai-e963a",
  storageBucket: "resumeai-e963a.appspot.com",
  messagingSenderId: "90320853667",
  appId: "1:90320853667:web:a4300ca04168ab4cfcbd16",
  measurementId: "G-SEBCM187EV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
