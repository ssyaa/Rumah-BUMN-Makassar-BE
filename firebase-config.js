// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC6WcgZ1UbBxHQ-B7jhna9-CTSCITOUSik",
    authDomain: "rumah-bumn-bcf55.firebaseapp.com",
    projectId: "rumah-bumn-bcf55",
    storageBucket: "rumah-bumn-bcf55.firebasestorage.app",
    messagingSenderId: "85763382483",
    appId: "1:85763382483:web:896bc2b438859de5b5c826",
    measurementId: "G-RMB37BKCJ0"
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
export const db = getFirestore(app);
const storage = getStorage(app);


export { app, auth, firestore, analytics, firebaseConfig, storage, db};