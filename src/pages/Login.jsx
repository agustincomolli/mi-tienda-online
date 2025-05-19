import Swal from 'sweetalert2';

import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();

  function handleClick(event) {
    event.preventDefault();
    const form = event.target.form || event.target.closest("form");
    const user = form.user.value;
    const password = form.password.value;
    const successMessage = "<p>¡Bienvendio!</p>"

    if (user.toLowerCase() == "usuario" && password.toLowerCase() == "contraseña") {
      console.log("OK")
      // Simulación de inicio de sesión exitoso
      localStorage.setItem("authToken", "miTokenSecreto");

      Swal.fire({
        title: "Información de contacto",
        html: successMessage,
        icon: "success",
        confirmButtonText: "Continuar",
      })
      // Redirigir al usuario a la página a la que intentaba acceder
      navigate(-1);
    }
  }

  return (
    <div className={styles.loginContent}>
      <h2>Iniciar sesión</h2>
      <form action="" className={styles.loginForm}>
        <input type="text" placeholder="Usuario" name="user" />
        <input type="password" name="password" id="password" placeholder="Contraseña" />
        <button className={`btn btn-primary ${styles.loginButton}`} onClick={handleClick} type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}