import { useRef, useEffect } from "react";

import Header from "./Header"
import Nav from "./Nav"
import Main from "./Main"
import Footer from "./Footer"
import CartDropdown from "../CartDropdown/CartDropdown"

import styles from "./Layout.module.css"

/**
 * Componente de layout general de la aplicación.
 * Incluye header, navegación, contenido principal y footer.
 * También gestiona la visualización y cierre del carrito de compras al hacer clic fuera.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {ReactNode} props.children - Contenido principal a renderizar (las páginas).
 * @param {Function} props.toggleCart - Función para mostrar/ocultar el carrito.
 * @param {number} props.cartItemCount - Cantidad total de productos en el carrito.
 * @param {boolean} props.showCart - Indica si el carrito está visible.
 * @param {Function} props.setShowCart - Función para cambiar la visibilidad del carrito.
 * @param {Array} props.cartItemsList - Lista de productos en el carrito.
 * @param {Function} props.setCartItemsList - Función para actualizar la lista del carrito.
 */
export default function Layout({ children, toggleCart, cartItemCount, showCart, setShowCart, cartItemsList, setCartItemsList }) {
    // Referencia al contenedor del carrito para detectar clics fuera de él
    const cartRef = useRef(null)

    useEffect(() => {
        // Si el carrito no está visible, no hace falta agregar el listener
        if (!showCart) return;

        // Cierra el carrito si se hace clic fuera de su contenedor
        function handleClickOutside(event) {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                setShowCart(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        // Limpia el listener al desmontar o cuando showCart cambia
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [showCart, setShowCart]);

    return (
        <div className={styles.layoutContainer}>
            {/* Header recibe funciones y datos como props */}
            <Header toggleCart={toggleCart} cartItemCount={cartItemCount} />
            <Nav />
            <Main>
                {/* Renderiza el contenido principal de la página actual */}
                {children}
            </Main>
            <Footer />

            {/* Carrito, solo se muestra si showCart es true */}
            {showCart && (
                // El ref permite detectar clics fuera de este div para cerrar el carrito
                <div ref={cartRef}>
                    <CartDropdown items={cartItemsList} setItems={setCartItemsList} />
                </div>
            )}
        </div>
    );
}