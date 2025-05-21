import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import styles from "./CartDropdown.module.css"
import CartDropdownItem from "./CartDropdownItem"

/**
 * Componente que representa el carrito de compras.
 * Muestra los productos agregados, permite modificar cantidades y eliminar productos.
 */
export default function CartDropdown({setShowCart}) {
    const { cartItemsList, getSubtotal } = useContext(CartContext);

    // Hook para navegar
    const navigate = useNavigate();

    function handleClick() {
        setShowCart(false);
        navigate("/cart");
    }

    // Renderiza el carrito desplegable.
    return (
        <div className={styles.cartDropdown}>
            <h3>Tu Carrito</h3>
            {
                // Si el carrito está vacío, muestra un mensaje.
                cartItemsList.length == 0 ? (
                    <p>Tu carrito está vacío</p>
                ) : (
                    // Si hay productos, los muestra en una lista.
                    <ul className={styles.cartItems}>
                        {cartItemsList.map(item => (
                            <li key={item.id} className={styles.cartItem}>
                                {/* Renderiza un CartItem por cada producto */}
                                <CartDropdownItem
                                    item={item}
                                />
                            </li>
                        ))}
                    </ul>
                )
            }
            {/* Muestra el subtotal y botones de acción */}
            <div className={styles.cartSummary}>
                <p>Subtotal: $ {getSubtotal()}</p>
                <button className={`btn btn-primary ${styles.cartSummaryButton}`} onClick={handleClick}>
                    Ver Carrito
                </button>
                {/* <button className={`btn btn-success ${styles.cartSummaryButton}`}>Finalizar Compra</button> */}
            </div>
        </div>
    );
}