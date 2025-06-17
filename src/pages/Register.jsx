import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { useState, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { Helmet } from '@dr.pogodin/react-helmet';
import styles from "./Register.module.css"; // Asegúrate de tener este archivo CSS

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup } = useContext(AuthContext); // Obtenemos la función signup del contexto
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    // Validación básica de campos
    if (!email || !password || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Campos requeridos",
        text: "Por favor, complete todos los campos.",
        confirmButtonText: "Entendido",
        customClass: {
          confirmButton: 'swal-btn-confirm',
        },
      });
      return;
    }

    // Validación de contraseña
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Contraseñas no coinciden",
        text: "Las contraseñas ingresadas no coinciden. Por favor, verifique.",
        confirmButtonText: "Reintentar",
        customClass: {
          confirmButton: 'swal-btn-confirm',
        },
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Contraseña débil",
        text: "La contraseña debe tener al menos 6 caracteres.",
        confirmButtonText: "Entendido",
        customClass: {
          confirmButton: 'swal-btn-confirm',
        },
      });
      return;
    }

    try {
      // Llamamos a la función signup del contexto
      const result = await signup(email, password);

      if (result.success) {
        Swal.fire({
          title: "Registro exitoso",
          html: `<p className="paragraph">¡Bienvenido! Has sido registrado como <strong>${email}</strong>.</p>`,
          icon: "success",
          confirmButtonText: "Continuar",
          customClass: {
            confirmButton: 'swal-btn-confirm',
          },
          timer: 4000,
          timerProgressBar: true,
          scrollbarPadding: false
        }).then(() => {
          navigate("/"); // Redirigir al inicio o a una página de bienvenida
        });
      } else {
        // Manejar errores específicos de Firebase
        let errorMessage = "Ocurrió un error al registrarse.";
        if (result.error.includes("auth/email-already-in-use")) {
          errorMessage = "El correo electrónico ya está en uso. Por favor, intente con otro.";
        } else if (result.error.includes("auth/invalid-email")) {
          errorMessage = "El formato del correo electrónico es inválido.";
        }
        Swal.fire({
          icon: "error",
          title: "Error de registro",
          text: errorMessage,
          confirmButtonText: "Reintentar",
          customClass: {
            confirmButton: 'swal-btn-cancel',
          },
          scrollbarPadding: false
        });
      }
    } catch (error) {
      console.error("Error inesperado durante el registro:", error);
      Swal.fire({
        icon: "error",
        title: "Error inesperado",
        text: "Hubo un problema al intentar registrarse. Por favor, intente de nuevo.",
        confirmButtonText: "Reintentar",
        customClass: {
          confirmButton: 'swal-btn-cancel',
        },
      });
    }
  }

  return (
    <>
      <Helmet>
        <title>Mi Tienda Online | Registrarse</title>
      </Helmet>

      <div className={styles.registerContent}>
        <h2 className="heading-2">Registrarse</h2>
        <form className={styles.registerForm} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            name="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña (mínimo 6 caracteres)"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            required
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className={`btn btn-primary ${styles.registerButton}`}
            type="submit"
          >
            Registrarse
          </button>
        </form>
      </div>
    </>
  );
}