import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Para almacenar información del usuario
  const [token, setToken] = useState(null); // Para almacenar el token

  // useEffect para verificar la autenticación al cargar la aplicación
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      try {
        setIsAuthenticated(true);
        setToken(storedToken);
        setUser(storedUser);
      } catch (error) {
        console.error("Error al parsear usuario de localStorage:", error);
        logout(); // Si hay un error, limpiar sesión
      }
    }
  }, []);

  function login(newToken, userData) {
    localStorage.setItem("authToken", newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    setIsAuthenticated(true);
  };

  function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  function hasRole(requiredRole) {
    return user && user.role === requiredRole;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );

}