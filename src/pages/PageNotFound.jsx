import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.css";
import Error404 from "../assets/404.webp";

export default function PageNotFound() {

  return (
    <section className={styles.mainContent}>
      <header className="header">
        <h1 className={styles.title}>¡Oops!</h1>
      </header>
      <section className="image">
        <img className={styles.cavernMan} src={Error404} alt="Págna no encontrada" />
      </section>
      <footer className="footer">
        <h3 className={styles.subtitle}>
          Parece que estás perdido
        </h3>
        <p className={styles.info}>¡La página que estás buscando no está disponible!</p>
        <p className={styles.info}>
          <Link to="/" className={`btn btn-success ${styles.goBack}`}>Ir al inicio</Link>
        </p>
      </footer>
    </section>
  );
}