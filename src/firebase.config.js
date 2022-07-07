// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVd-leM8YanCdd1j63NTEsmIvlrYYYQuk",
  authDomain: "houselisting-app.firebaseapp.com",
  projectId: "houselisting-app",
  storageBucket: "houselisting-app.appspot.com",
  messagingSenderId: "878339426367",
  appId: "1:878339426367:web:19341d4a8513c9479d508a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)