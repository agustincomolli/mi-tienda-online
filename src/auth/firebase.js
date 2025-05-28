// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Puedes usar analytics si lo necesitas, si no, puedes quitarlo.
export const auth = getAuth(app); // Exportamos 'auth' para usarlo en otros componentes

/**
 * Registra un nuevo usuario con correo electrónico y contraseña.
 * @param {string} email El correo electrónico del usuario.
 * @param {string} password La contraseña del usuario.
 * @returns {Promise<UserCredential>} Una promesa que se resuelve con las credenciales del usuario.
 */
export async function registerUser(email, password) { // Cambiamos el nombre y la hacemos async/await
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Usuario registrado con éxito:", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Error al registrar usuario:", error.code, error.message);
    throw error; // Lanzamos el error para que el componente que llama lo pueda manejar
  }
}

/**
 * Inicia sesión a un usuario con correo electrónico y contraseña.
 * @param {string} email El correo electrónico del usuario.
 * @param {string} password La contraseña del usuario.
 * @returns {Promise<UserCredential>} Una promesa que se resuelve con las credenciales del usuario.
 */
export async function loginUser(email, password) { // Nueva función para iniciar sesión
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Usuario ha iniciado sesión:", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Error al iniciar sesión:", error.code, error.message);
    throw error; // Lanzamos el error
  }
}

/**
 * Cierra la sesión del usuario actual.
 */
export async function logoutUser() { // Nueva función para cerrar sesión
  try {
    await signOut(auth);
    console.log("Sesión cerrada con éxito.");
  } catch (error) {
    console.error("Error al cerrar sesión:", error.code, error.message);
    throw error;
  }
}

/**
 * Inicia sesión con Google.
 * @returns {Promise<UserCredential>} Una promesa que se resuelve con las credenciales del usuario.
 */
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Inicio de sesión con Google exitoso:", result.user);
    return result;
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error.code, error.message);
    throw error;
  }
}
