import Swal from 'sweetalert2';
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Obtenemos la función login del contexto
  const { login } = useContext(AuthContext); // Obtenemos la función login de Firebase
  const navigate = useNavigate();
  const location = useLocation();
  // Si alguien fue redirigido a /login desde una ruta protegida, guardamos esa ruta
  const from = location.state?.from?.pathname || "/";

  async function handleSubmit(event) {
    event.preventDefault();

    // Validación básica
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
      const result = await login(email, password); // Llamamos a la función login del contexto

      if (result.success) {
        await Swal.fire({
          title: "Inicio de sesión exitoso",
          html: `<p>¡Bienvenido, <strong>${result.user.email}</strong>!</p>`,
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
        // Manejar errores específicos de Firebase Authentication
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
      console.error("Error inesperado durante el inicio de sesión:", error);

      await Swal.fire({
        icon: "error",
        title: "Error inesperado",
        text: "Hubo un problema al intentar iniciar sesión. Por favor, intente de nuevo.",
        confirmButtonText: "Reintentar"
      });
    }
  }

  return (
    <div className={styles.loginContent}>
      <h2>Iniciar sesión</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          type="email" // Cambiado a type="email"
          placeholder="Correo electrónico"
          name="email"
          required
          autoComplete="email" // Cambiado a email
          onChange={(e) => { setEmail(e.target.value) }}
          value={email} // Controlar el input
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          required
          autoComplete="current-password"
          onChange={(e) => { setPassword(e.target.value) }}
          value={password} // Controlar el input
        />
        <button
          className={`btn btn-primary ${styles.loginButton}`}
          type="submit"
        >
          Iniciar sesión
        </button>
      </form>
      <div className={styles.loginHelp}>
        <p>¿No tienes una cuenta? <Link to="/register" className='link'>Regístrate aquí</Link></p>
        <p>
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