import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import styles from "./CartDropdown.module.css"

/**
 * Componente que representa un producto dentro del carrito.
 * Permite modificar la cantidad o eliminar el producto.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.item - Producto del carrito.
 */
export default function CartDropdownItem({ item }) {
    const { removeItem, updateQuantity } = useContext(CartContext);

    function handleIncreaseQuantity() {
        updateQuantity(item.id, item.quantity + 1)
    };

    function handleDecreaseQuantity() {
        updateQuantity(item.id, item.quantity - 1)
    };

    function handleRemoveItem() {
        removeItem(item.id)
    };

    return (
        <div className={styles.itemInfo}>
            {/* Nombre del producto */}
            <h4>{item.title}</h4>
            {/* Precio unitario */}
            <p>$ {item.price}</p>
            {/* Controles para modificar cantidad y eliminar */}
            <div className={styles.itemControls}>
                {/* Botón para disminuir cantidad */}
                <button onClick={handleDecreaseQuantity}>-</button>
                <span>{item.quantity}</span>
                {/* Botón para aumentar cantidad */}
                <button onClick={handleIncreaseQuantity}>+</button>
                {/* Botón para eliminar producto */}
                <button className={styles.removeBtn} onClick={handleRemoveItem}>×</button>
            </div>
        </div>
    );
}