import { Link } from "react-router-dom";
import styles from "./Nav.module.css"

/**
 * Componente de navegación principal.
 * Muestra enlaces a distintas categorías.
 */
export default function Nav() {
    return (
        <nav className={styles.nav}>
            <ul className={styles.navMenu}>
                <li><Link className={`${styles.navMenuLink} ${styles.home}`} to="/">
                    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                    </svg>
                    <span>Inicio</span>
                </Link></li>
                <li><Link className={styles.navMenuLink} to="/products">Productos</Link></li>
                <li><Link className={styles.navMenuLink} to="/about">Acerca de</Link></li>
                <li><Link className={styles.navMenuLink} to="/contact">Contacto</Link></li>
            </ul>
        </nav>
    );
}