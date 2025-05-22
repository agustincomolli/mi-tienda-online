import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

import logo from "../../assets/icons/react.svg"
import cartImage from "../../assets/icons/cart.svg"

import styles from "./Header.module.css"

/**
 * Componente de cabecera de la aplicación.
 * Muestra el logo, la barra de búsqueda y el icono del carrito.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.toggleCart - Función para mostrar/ocultar el carrito.
 */
export default function Header({ toggleCart, menuOpen, setMenuOpen }) {
    const { getTotalItemCount } = useContext(CartContext);

    return (
        <header className={styles.header}>
            <div className={styles.headerRow}>
                <div className={styles.logo}>
                    <img className={styles.logoImage} src={logo} alt="Logo" />
                    <span>Mi Tienda Online</span>
                </div>
                <button
                    className={styles.hamburger}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Abrir menú"
                >
                    <i className={`bx ${menuOpen ? "bx-x" : "bx-menu"}`}></i>
                </button>
            </div>
            <div className={`${styles.searchBar} ${menuOpen ? styles.searchBarHidden : ''}`}>
                <input type="text" placeholder="Buscar productos..." />
                <button className="btn btn-primary">Buscar</button>
            </div>
            <div className={styles.cart} onClick={toggleCart} title="Carrito de compras">
                <img className={styles.cartImage} src={cartImage} alt="Carrito" />
                <span className={styles.cartItemCount}>{getTotalItemCount()}</span>
            </div>
        </header >
    );
}