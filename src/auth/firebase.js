// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5U7aGrBzaxmGiYhI2A68_KP3uYfBzS5U",
  authDomain: "mi-tienda-online-e2bcd.firebaseapp.com",
  projectId: "mi-tienda-online-e2bcd",
  storageBucket: "mi-tienda-online-e2bcd.firebasestorage.app",
  messagingSenderId: "1096126102869",
  appId: "1:1096126102869:web:7334d44e381d714d0883dc",
  measurementId: "G-QG567HQ8Z2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export function createNewUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      console.log("Credenciales: ", userCredential);
      const user = userCredential.user;
      console.log("Usuario: ", userCredential.user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}