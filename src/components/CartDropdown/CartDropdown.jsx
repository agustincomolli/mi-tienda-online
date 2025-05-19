import { useNavigate } from "react-router-dom";
import styles from "./CartDropdown.module.css"
import CartItem from "./CartDropdownItem"

/**
 * Componente que representa el carrito de compras.
 * Muestra los productos agregados, permite modificar cantidades y eliminar productos.
 * 
 * @param {Object} props - Propiedades recibidas desde el componente padre.
 * @param {Array} props.items - Lista de productos en el carrito.
 * @param {Function} props.setItems - Función para actualizar la lista de productos en el carrito.
 */
export default function Cart({ items, setItems }) {
    // Hook para navegar
    const navigate = useNavigate();
    /**
     * Calcula el subtotal sumando el precio por la cantidad de cada producto.
     * @returns {string} Subtotal formateado con dos decimales.
     */
    function getSubtotal() {
        let subtotal = 0;
        // Recorre todos los productos y suma el total de cada uno.
        items.forEach(item => {
            subtotal += item.price * item.quantity
        });
        return subtotal.toFixed(2)
    };

    /**
     * Elimina un producto del carrito por su id.
     * @param {number} id - ID del producto a eliminar.
     */
    function removeItem(id) {
        // Filtra el producto que no coincide con el id recibido.
        setItems(items.filter(item => item.id !== id))
    };

    function handleClick() {
        navigate("/cart")
    }

    /**
     * Actualiza la cantidad de un producto en el carrito.
     * Si la nueva cantidad es menor a 1, no hace nada.
     * @param {number} id - ID del producto a actualizar.
     * @param {number} newQuantity - Nueva cantidad para el producto.
     */
    function updateQuantity(id, newQuantity) {
        if (newQuantity < 1) return;
        // Mapea los productos y actualiza solo el que coincide con el id.
        setItems(
            items.map(
                item => item.id === id ? { ...item, quantity: newQuantity } : item
            ));
    };

    // Renderiza el carrito desplegable.
    return (
        <div className={styles.cartDropdown}>
            <h3>Tu Carrito</h3>
            {
                // Si el carrito está vacío, muestra un mensaje.
                items.length == 0 ? (
                    <p>Tu carrito está vacío</p>
                ) : (
                    // Si hay productos, los muestra en una lista.
                    <ul className={styles.cartItems}>
                        {items.map(item => (
                            <li key={item.id} className={styles.cartItem}>
                                {/* Renderiza un CartItem por cada producto */}
                                <CartItem
                                    item={item}
                                    updateQuantity={updateQuantity}
                                    removeItem={removeItem}
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