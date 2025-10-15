// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
// NOTE: It is a security risk to expose your apiKey. Consider using environment variables.
const firebaseConfig = {
    apiKey: "AIzaSyDFBhe7k93lFYLuR6c9p08BgVMTfLTFrCU", // Make sure you add your API key here
    authDomain: "pharmacy-backend-bca79.firebaseapp.com",
    projectId: "pharmacy-backend-bca79",
    storageBucket: "pharmacy-backend-bca79.appspot.com", // Corrected common typo
    messagingSenderId: "291644010235",
    appId: "1:291644010235:web:b5a668dec5349c105aca5e",
    measurementId: "G-RNERBBZRNB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Export initialized services for use in other parts of the application
export const db = getFirestore(app);