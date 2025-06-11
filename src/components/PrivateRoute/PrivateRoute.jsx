import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function PrivateRoute() {
  const { currentUser, loadingAuth, isAdmin } = useContext(AuthContext); // Obtenemos el usuario y el estado de carga
  const location = useLocation();

  if (loadingAuth) {
    // Muestra un spinner o mensaje de carga mientras se verifica el estado de autenticación
    return <LoadingSpinner message="Verificando autenticación..." />;
  }

  // Si no hay un usuario autenticado, redirige a la página de login
  if (!currentUser) {
    // Almacena la ubicación actual para redirigir después de iniciar sesión
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Ruta admin protegida adicionalmente
  if (location.pathname.startsWith("/admin") && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Si hay un usuario autenticado, renderiza las rutas anidadas
  return <Outlet />;
}