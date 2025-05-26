import Swal from 'sweetalert2';
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import styles from "./Login.module.css";

export default function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  // Obtenemos la función login del contexto
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  // Si alguien fue redirigido a /login desde una ruta protegida, guardamos esa ruta
  const from = location.state?.from?.pathname || "/";

  function handleSubmit(event) {
    event.preventDefault();

    // Validación básica
    if (!username || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos requeridos",
        text: "Por favor, complete todos los campos",
        confirmButtonText: "Entendido"
      });
      return;
    }

    const successMessage = `<p>¡Bienvenido, <strong>${username.toUpperCase()}</strong>!</p>`;

    if (username.toLowerCase() === "usuario" && password.toLowerCase() === "contraseña") {
      // Simulación de inicio de sesión exitoso
      const token = `fake-jwt-token-${username}`;
      const userData = { username: username.toLowerCase(), role: "user" };
      login(token, userData);

      Swal.fire({
        title: "Inicio de sesión exitoso",
        html: successMessage,
        icon: "success",
        confirmButtonText: "Continuar",
        customClass: {
          confirmButton: 'swal-btn-confirm',
        },
        timer: 4000,
        timerProgressBar: true,
        // Esta línea previene el salto
        scrollbarPadding: false
      }).then(() => {
        // Redirigir al usuario a donde quería ir
        navigate(from, { replace: true });
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Credenciales incorrectas",
        text: "El usuario o la contraseña son incorrectos",
        footer: 'Revise la información e intente nuevamente',
        confirmButtonText: "Reintentar",
        customClass: {
          confirmButton: 'swal-btn-cancel',
        },
        // Esta línea previene el salto
        scrollbarPadding: false
      });
    }
  }

  return (
    <div className={styles.loginContent}>
      <h2>Iniciar sesión</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          name="user"
          required
          autoComplete="username"
          onChange={(e) => { setUsername(e.target.value) }}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          required
          autoComplete="current-password"
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <button
          className={`btn btn-primary ${styles.loginButton}`}
          type="submit"
        >
          Iniciar sesión
        </button>
      </form>
      <div className={styles.loginHelp}>
        <p>
          <small>
            <strong>Credenciales de prueba:</strong><br />
            Usuario: usuario<br />
            Contraseña: contraseña
          </small>
        </p>
      </div>
    </div>
  );
}