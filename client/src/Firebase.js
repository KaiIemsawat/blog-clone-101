// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-mern-3a6e2.firebaseapp.com",
  projectId: "blog-mern-3a6e2",
  storageBucket: "blog-mern-3a6e2.appspot.com",
  messagingSenderId: "136064946190",
  appId: "1:136064946190:web:ecd3409f74872decaaec5f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
