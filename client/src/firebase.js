// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // How to use .env in frontend (VITE)
    authDomain: "mern-blog-c6b5a.firebaseapp.com",
    projectId: "mern-blog-c6b5a",
    storageBucket: "mern-blog-c6b5a.appspot.com",
    messagingSenderId: "936558086622",
    appId: "1:936558086622:web:8a6075bef7af093654f54f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
