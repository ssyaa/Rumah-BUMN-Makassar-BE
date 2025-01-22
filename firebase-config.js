// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBKVzYLUsQDWcINkM4KcOHLrNEBOAnZ11k",
    authDomain: "rumah-bumn-e8f5a.firebaseapp.com",
    projectId: "rumah-bumn-e8f5a",
    storageBucket: "rumah-bumn-e8f5a.firebasestorage.app",
    messagingSenderId: "616998037603",
    appId: "1:616998037603:web:90ef785dbad6c088ee7056",
    measurementId: "G-B1JNMNW78R"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Check if analytics is supported before initializing
let analytics;
isSupported()
    .then((supported) => {
        if (supported) {
        analytics = getAnalytics(app);
        } else {
        console.warn("Analytics is not supported in this environment.");
        }
    })
    .catch((error) => {
        console.error("Error checking analytics support:", error);
    });

const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, auth, firestore, analytics };