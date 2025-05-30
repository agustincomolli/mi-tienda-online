import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    function handleSearch(event) {
        event.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
        }
    }

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
            <form onSubmit={handleSearch} className={`${styles.searchBar} ${menuOpen ? styles.searchBarHidden : ''}`}>
                <input
                    type="text"
                    name="to-search"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-primary">Buscar</button>
            </form>
            <div className={styles.cart} onClick={toggleCart} title="Carrito de compras">
                <img className={styles.cartImage} src={cartImage} alt="Carrito" />
                <span className={styles.cartItemCount}>{getTotalItemCount()}</span>
            </div>
        </header >
    );
}