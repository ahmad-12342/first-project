<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDy32moDuvKHvYekhXoA_RZALEtA5kBLS0",
    authDomain: "mahad-web.firebaseapp.com",
    projectId: "mahad-web",
    storageBucket: "mahad-web.firebasestorage.app",
    messagingSenderId: "597667883854",
    appId: "1:597667883854:web:56d886b099fc89cd87cc1f",
    measurementId: "G-SW6D2PMSGT"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>