// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDFBhe7k93lFYLuR6c9p08BgVMTfLTFrCU",
    authDomain: "pharmacy-backend-bca79.firebaseapp.com",
    projectId: "pharmacy-backend-bca79",
    storageBucket: "pharmacy-backend-bca79.firebasestorage.app",
    messagingSenderId: "291644010235",
    appId: "1:291644010235:web:b5a668dec5349c105aca5e",
    measurementId: "G-RNERBBZRNB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export initialized services for use in other parts of the application
export const db = getFirestore(app);