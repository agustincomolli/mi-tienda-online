import Swal from 'sweetalert2';
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import styles from "./Login.module.css";

/**
 * Componente de Login.
 * Permite al usuario iniciar sesión con email/contraseña o con Google.
 * Muestra mensajes de error y éxito usando SweetAlert2.
 */
export default function Login() {
  // Estados para los campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Obtenemos las funciones de login del contexto de autenticación
  const { login, loginGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  // Si el usuario fue redirigido desde una ruta protegida, guardamos esa ruta para volver después del login
  const from = location.state?.from?.pathname || "/";

  /**
   * Maneja el envío del formulario de login con email y contraseña.
   * @param {Event} event Evento de envío del formulario.
   */
  async function handleSubmit(event) {
    event.preventDefault();

    // Validación básica de campos vacíos
    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos requeridos",
        text: "Por favor, complete todos los campos",
        confirmButtonText: "Entendido"
      });
      return;
    }

    try {
      // Llamamos a la función login del contexto (Firebase)
      const result = await login(email, password);

      if (result.success) {
        // Login exitoso, mostramos mensaje y redirigimos
        await Swal.fire({
          title: "Inicio de sesión exitoso",
          html: `<p className="paragraph">¡Bienvenido, <strong>${result.user.email}</strong>!</p>`,
          icon: "success",
          confirmButtonText: "Continuar",
          customClass: {
            confirmButton: 'swal-btn-confirm',
          },
          timer: 4000,
          timerProgressBar: true,
          scrollbarPadding: false
        });

        navigate(from, { replace: true });

      } else {
        // Manejo de errores específicos de Firebase Authentication
        let errorMessage = "Credenciales incorrectas. Verifique su correo y contraseña.";

        if (result.error.includes("auth/invalid-credential")) {
          errorMessage = "Correo electrónico o contraseña incorrectos.";
        } else if (result.error.includes("auth/user-not-found")) {
          errorMessage = "No hay ningún usuario registrado con este correo electrónico.";
        } else if (result.error.includes("auth/wrong-password")) {
          errorMessage = "La contraseña es incorrecta.";
        } else if (result.error.includes("auth/invalid-email")) {
          errorMessage = "El formato del correo electrónico es inválido.";
        }

        await Swal.fire({
          icon: "error",
          title: "Error de inicio de sesión",
          text: errorMessage,
          footer: 'Revise la información e intente nuevamente',
          confirmButtonText: "Reintentar",
          customClass: {
            confirmButton: 'swal-btn-cancel',
          },
          scrollbarPadding: false
        });
      }
    } catch (error) {
      // Error inesperado durante el login
      console.error("Error inesperado durante el inicio de sesión:", error);

      await Swal.fire({
        icon: "error",
        title: "Error inesperado",
        text: "Hubo un problema al intentar iniciar sesión. Por favor, intente de nuevo.",
        confirmButtonText: "Reintentar"
      });
    }
  }

  /**
   * Maneja el login social (por ejemplo, Google).
   * @param {Function} socialLoginFunction Función de login social del contexto.
   */
  async function handleSocialLogin(socialLoginFunction) {
    try {
      const result = await socialLoginFunction();
      if (result.success) {
        // Login social exitoso
        await Swal.fire({
          title: "Inicio de sesión exitoso",
          html: `<p className="paragraph">¡Bienvenido, <strong>${result.user.displayName || result.user.email}</strong>!</p>`,
          icon: "success",
          confirmButtonText: "Continuar",
          customClass: {
            confirmButton: 'swal-btn-confirm',
          },
          timer: 4000,
          timerProgressBar: true,
          scrollbarPadding: false
        });
        navigate(from, { replace: true });
      } else {
        // Manejo de errores comunes en login social
        let errorMessage = "Hubo un problema al iniciar sesión con este proveedor. Por favor, intente de nuevo.";
        if (result.error.includes("auth/popup-closed-by-user")) {
          errorMessage = "La ventana de inicio de sesión fue cerrada.";
        } else if (result.error.includes("auth/cancelled-popup-request")) {
          errorMessage = "La solicitud de inicio de sesión fue cancelada.";
        } else if (result.error.includes("auth/account-exists-with-different-credential")) {
          errorMessage = "Ya existe una cuenta con el mismo correo electrónico pero con diferentes credenciales de inicio de sesión.";
        }
        await Swal.fire({
          icon: "error",
          title: "Error de inicio de sesión",
          text: errorMessage,
          confirmButtonText: "Reintentar",
          customClass: {
            confirmButton: 'swal-btn-cancel',
          },
          scrollbarPadding: false
        });
      }
    } catch (error) {
      // Error inesperado durante el login social
      console.error("Error inesperado durante el inicio de sesión social:", error);
      await Swal.fire({
        icon: "error",
        title: "Error inesperado",
        text: "Hubo un problema al intentar iniciar sesión con este proveedor. Por favor, intente de nuevo.",
        confirmButtonText: "Reintentar"
      });
    }
  }

  // Renderizado del formulario de login y botones sociales
  return (
    <div className={styles.loginContent}>
      <h2 className="heading-2">Iniciar sesión</h2>
      {/* Formulario de login */}
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          type="email" // Campo de correo electrónico
          placeholder="Correo electrónico"
          name="email"
          required
          autoComplete="email"
          onChange={(e) => { setEmail(e.target.value) }}
          value={email}
        />
        <input
          type="password" // Campo de contraseña
          name="password"
          placeholder="Contraseña"
          required
          autoComplete="current-password"
          onChange={(e) => { setPassword(e.target.value) }}
          value={password}
        />
        <button
          className={`btn btn-primary ${styles.loginButton}`}
          type="submit"
        >
          Iniciar sesión
        </button>
      </form>

      {/* Login social */}
      <div className={styles.socialLoginContainer}>
        <p className={styles.socialLoginText}>O inicia sesión con:</p>
        <div className={styles.socialButtons}>
          <button
            className={`${styles.socialButton} ${styles.googleButton}`}
            onClick={() => handleSocialLogin(loginGoogle)}
            aria-label="Iniciar sesión con Google"
          >
            {/* Icono SVG multicolor de Google */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.449 12.224C22.449 11.455 22.385 10.686 22.257 9.929H12.24V14.152H17.917C17.653 15.586 16.804 16.787 15.659 17.575L15.632 17.755L19.062 20.373L19.262 20.386C21.365 18.497 22.449 15.674 22.449 12.224Z" fill="#4285F4" />
              <path d="M12.24 22.999C15.044 22.999 17.447 22.062 19.262 20.386L15.659 17.575C14.708 18.211 13.563 18.625 12.24 18.625C9.712 18.625 7.573 16.949 6.785 14.619L6.758 14.776L3.149 17.551L3.042 17.585C4.808 21.015 8.204 22.999 12.24 22.999Z" fill="#34A853" />
              <path d="M6.785 14.619C6.592 14.078 6.486 13.487 6.486 12.883C6.486 12.279 6.592 11.688 6.785 11.147L6.758 10.979L3.042 8.196L3.149 8.162C2.458 9.516 2.072 11.127 2.072 12.883C2.072 14.639 2.458 16.25 3.149 17.585L6.785 14.619Z" fill="#FBBC05" />
              <path d="M12.24 6.756C13.626 6.756 14.887 7.232 15.894 8.11L19.349 4.655C17.447 2.979 15.044 2.042 12.24 2.042C8.204 2.042 4.808 4.026 3.042 7.456L6.785 10.322C7.573 7.992 9.712 6.756 12.24 6.756Z" fill="#EA4335" />
            </svg>
            Google
          </button>
        </div>
      </div>

      {/* Ayuda y registro */}
      <div className={styles.loginHelp}>
        <p className="paragraph">¿No tienes una cuenta? <Link to="/register" className='link'>Regístrate aquí</Link></p>
        <p className="paragraph">
          <small>
            <strong>Credenciales de prueba (registra uno nuevo):</strong><br />
            Email: prueba@example.com<br />
            Contraseña: 123456
          </small>
        </p>
      </div>
    </div>
  );
}