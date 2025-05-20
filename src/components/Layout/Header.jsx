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
export default function Header({ toggleCart }) {
    const {getTotalItemCount} = useContext(CartContext);
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img className={styles.logoImage} src={logo} alt="Logo" /> Mi Tienda Online
            </div>
            <div className={styles.searchBar}>
                <input type="text" placeholder="Buscar productos..." />
                <button className="btn btn-primary">Buscar</button>
            </div>
            <div className={styles.cart} onClick={toggleCart} title="Carrito de compras">
                <img className={styles.cartImage} src={cartImage} alt="Carrito" />
                <span className={styles.cartItemCount}>{getTotalItemCount()}</span>
            </div>
        </header>
    );
}