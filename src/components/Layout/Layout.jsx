import { useRef, useEffect, useState } from "react";

import Header from "./Header";
import Nav from "./Nav";
import Main from "./Main";
import Footer from "./Footer";
import CartDropdown from "../CartDropdown/CartDropdown";
import WhatsApp from "../WhatsApp/WhatsApp";

import styles from "./Layout.module.css";

/**
 * Componente de layout general de la aplicación.
 * Incluye header, navegación, contenido principal y footer.
 * También gestiona la visualización y cierre del carrito de compras al hacer clic fuera.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {ReactNode} props.children - Contenido principal a renderizar (las páginas).
 * @param {Function} props.toggleCart - Función para mostrar/ocultar el carrito.
 * @param {boolean} props.showCart - Indica si el carrito está visible.
 * @param {Function} props.setShowCart - Función para cambiar la visibilidad del carrito.
 */
export default function Layout({ children, toggleCart, showCart, setShowCart }) {
    // Referencia al contenedor del carrito para detectar clics fuera de él
    const cartRef = useRef(null)
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const noScrollClass = "noScroll";
        // Bloquear scroll cuando el menú hamburguesa está abierto
        if (menuOpen) {
            document.body.classList.add(noScrollClass);
        } else {
            document.body.classList.remove(noScrollClass);
        }
        // Limpiar al desmontar
        return () => {
            document.body.classList.remove(noScrollClass);
        };
    }, [menuOpen]);

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
            <Header toggleCart={toggleCart} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Main>
                {/* Renderiza el contenido principal de la página actual */}
                {children}
            </Main>
            <Footer />

            {/* Carrito, solo se muestra si showCart es true */}
            {showCart && (
                // El ref permite detectar clics fuera de este div para cerrar el carrito
                <div ref={cartRef}>
                    <CartDropdown setShowCart={setShowCart} />
                </div>
            )}
            <WhatsApp />
        </div>
    );
}