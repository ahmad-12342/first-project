import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { getFirestore, doc, setDoc, addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDy32moDuvKHvYekhXoA_RZALEtA5kBLS0",
    authDomain: "mahad-web.firebaseapp.com",
    projectId: "mahad-web",
    storageBucket: "mahad-web.firebasestorage.app",
    messagingSenderId: "597667883854",
    appId: "1:597667883854:web:56d886b099fc89cd87cc1f",
    measurementId: "G-SW6D2PMSGT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in other scripts
window.firebaseApp = { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, doc, setDoc, addDoc, collection, serverTimestamp };
