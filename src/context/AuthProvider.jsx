import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from "./AuthContext";
import { auth, loginUser, registerUser, logoutUser } from "../auth/firebase"; // Importamos las funciones de Firebase
import { onAuthStateChanged } from "firebase/auth"; // Importamos para escuchar cambios en el estado de autenticación

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // Almacena el usuario autenticado
  const [loadingAuth, setLoadingAuth] = useState(true); // Nuevo estado para indicar si la autenticación inicial está cargando

  // Función para registrar un nuevo usuario con Firebase
  const signup = useCallback(async (email, password) => {
    try {
      await registerUser(email, password);
      // Firebase automáticamente actualizará el currentUser a través de onAuthStateChanged
      return { success: true };
    } catch (error) {
      console.error("Error en signup:", error);
      return { success: false, error: error.message };
    }
  }, []);

  // Función para iniciar sesión con Firebase
  const login = useCallback(async (email, password) => { // Cambiamos los parámetros a email y password
    try {
      const userCredential = await loginUser(email, password);
      // Firebase automáticamente actualizará el currentUser a través de onAuthStateChanged
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error("Error en login:", error);
      return { success: false, error: error.message };
    }
  }, []);

  // Función para cerrar sesión con Firebase
  const logout = useCallback(async () => {
    try {
      await logoutUser();
      // Firebase automáticamente actualizará el currentUser a null a través de onAuthStateChanged
      return { success: true };
    } catch (error) {
      console.error("Error en logout:", error);
      return { success: false, error: error.message };
    }
  }, []);

  // Efecto para escuchar cambios en el estado de autenticación de Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // 'user' será null si no hay sesión o un objeto User si la hay
      setLoadingAuth(false); // La carga inicial ha terminado
    });

    // Limpia la suscripción cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  // El valor que se proveerá a los componentes hijos
  const authContextValue = {
    currentUser, // El usuario autenticado (o null)
    loadingAuth, // Si la autenticación inicial aún está cargando
    signup,      // Función para registrar
    login,       // Función para iniciar sesión
    logout       // Función para cerrar sesión
  };

  // Mientras la autenticación inicial esté cargando, podrías mostrar un spinner
  if (loadingAuth) {
    return <div>Cargando autenticación...</div>; // Puedes reemplazar esto con un componente de spinner
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};