import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { app } from './firebase-config.js';

// Initialize Firebase Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// DOM Elements
const authView = document.getElementById('auth-view');
const appContainer = document.getElementById('app-container');
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const googleSignInBtn = document.getElementById('google-signin-btn');
const logoutBtn = document.getElementById('logout-btn');
const authError = document.getElementById('auth-error');
const userEmailDisplay = document.getElementById('user-email');

/**
 * Handles the authentication state change.
 * If a user is logged in, it shows the app container and hides the auth view.
 * If no user is logged in, it shows the auth view and hides the app container.
 */
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        console.log('User is signed in:', user.email);
        userEmailDisplay.textContent = user.email;
        authView.classList.add('hidden');
        appContainer.classList.remove('hidden');
    } else {
        // User is signed out
        console.log('User is signed out.');
        userEmailDisplay.textContent = '';
        authView.classList.remove('hidden');
        appContainer.classList.add('hidden');
    }
});

/**
 * Event listener for the email/password login form submission.
 */
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    authError.textContent = ''; // Clear previous errors

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // onAuthStateChanged will handle the UI update
    } catch (error) {
        console.error('Login Error:', error.message);
        authError.textContent = 'Failed to sign in. Please check your email and password.';
    }
});

/**
 * Event listener for the Google Sign-In button.
 */
googleSignInBtn.addEventListener('click', async () => {
    authError.textContent = ''; // Clear previous errors
    try {
        await signInWithPopup(auth, googleProvider);
        // onAuthStateChanged will handle the UI update
    } catch (error) {
        console.error('Google Sign-In Error:', error.message);
        authError.textContent = 'Failed to sign in with Google. Please try again.';
    }
});

/**
 * Event listener for the logout button.
 */
logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
        // onAuthStateChanged will handle the UI update
    } catch (error) {
        console.error('Logout Error:', error.message);
        alert('Failed to log out. Please try again.');
    }
});