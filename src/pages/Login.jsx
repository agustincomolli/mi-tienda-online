import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = formData.get('user').trim();
    const password = formData.get('password');

    // Validación básica
    if (!user || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos requeridos",
        text: "Por favor, complete todos los campos",
        confirmButtonText: "Entendido"
      });
      return;
    }

    const successMessage = `<p>¡Bienvenido, <strong>${user.toUpperCase()}</strong>!</p>`;

    if (user.toLowerCase() === "usuario" && password.toLowerCase() === "contraseña") {
      // Simulación de inicio de sesión exitoso
      localStorage.setItem("authToken", "miTokenSecreto");

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
        // Redirigir al usuario a la página anterior
        navigate(-1);
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
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          required
          autoComplete="current-password"
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