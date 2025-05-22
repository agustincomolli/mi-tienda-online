import { Link, useNavigate } from "react-router-dom";
import styles from "./Nav.module.css"

/**
 * Componente de navegación principal.
 * Muestra enlaces a distintas categorías.
 */
export default function Nav({ menuOpen, setMenuOpen }) {
    const isLoggedIn = localStorage.getItem("authToken") !== null;
    const navigate = useNavigate();

    function handleLogout(event) {
        event.preventDefault();
        localStorage.removeItem("authToken");
        navigate("/");
        setMenuOpen(false); // Cierra el menú al cerrar sesión
    }

    // Cierra el menú al hacer clic en cualquier enlace
    function handleMenuItemClick() {
        setMenuOpen(false);
    }

    return (
        <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
            <ul className={styles.navMenu}>
                <li>
                    <Link className={`${styles.navMenuLink} ${styles.navMenuLinkIcon}`} to="/" onClick={handleMenuItemClick}>
                        <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                        </svg>
                        <span>Inicio</span>
                    </Link>
                </li>
                <li>
                    <Link className={styles.navMenuLink} to="/products" onClick={handleMenuItemClick}>Productos</Link>
                </li>
                <li>
                    <Link className={styles.navMenuLink} to="/about" onClick={handleMenuItemClick}>Acerca de</Link>
                </li>
                <li>
                    <Link className={styles.navMenuLink} to="/contact" onClick={handleMenuItemClick}>Contacto</Link>
                </li>
                <li>
                    <Link className={styles.navMenuLink} to="/cart" onClick={handleMenuItemClick}>Carrito</Link>
                </li>
                {isLoggedIn ? (
                    <li className={styles.logInOut}>
                        <Link className={`${styles.navMenuLink} ${styles.navMenuLinkIcon}`} to="/" onClick={handleLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
                                <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
                            </svg>
                            <span>Cerrar sesión</span>
                        </Link>
                    </li>
                ) : (
                    <li className={styles.logInOut}>
                        <Link className={`${styles.navMenuLink} ${styles.navMenuLinkIcon}`} to="/login" onClick={handleMenuItemClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                                <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                            </svg>
                            <span>Iniciar sesión</span>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}