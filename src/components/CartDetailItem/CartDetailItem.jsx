import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

import styles from "./CartDetailItem.module.css";

/**
 * Componente que representa un producto dentro del carrito de compras.
 * 
 * - Permite aumentar o disminuir la cantidad del producto.
 * - Permite eliminar el producto del carrito.
 * 
 * Props:
 * @param {Object} props
 * @param {Object} props.item - Objeto con los datos del producto en el carrito.
 * 
 * Contexto:
 * - removeItem: Función para eliminar un producto del carrito.
 * - updateQuantity: Función para actualizar la cantidad de un producto.
 * 
 * @returns {JSX.Element} Componente visual de un ítem del carrito.
 */
export default function CartDetailItem({ item }) {
  // Obtiene funciones del contexto del carrito
  const { removeItem, updateQuantity } = useContext(CartContext);

  /**
   * Incrementa la cantidad del producto en el carrito.
   */
  function handleIncreaseQuantity() {
    updateQuantity(item.id, item.quantity + 1)
  };

  /**
   * Disminuye la cantidad del producto en el carrito.
   */
  function handleDecreaseQuantity() {
    updateQuantity(item.id, item.quantity - 1)
  };

  /**
   * Elimina el producto del carrito.
   */
  function handleRemoveItem() {
    removeItem(item.id)
  };

  return (
    <>
      <div className={styles.image}>
        <img src={item.thumbnail} alt={item.title} height="100px" />
      </div>
      <div className={styles.details}>
        <div className={styles.info}>
          <span className={styles.title}>{item.title}</span>
          <span className={styles.price}>$ {item.price}</span>
        </div>
        <div className={styles.quantity}>
          <button className={styles.quantityButton} onClick={handleDecreaseQuantity} title="Disminuir">
            <i className='bx bx-minus'></i>
          </button>
          <span className={styles.quantityValue}>{item.quantity}</span>
          <button className={styles.quantityButton} onClick={handleIncreaseQuantity} title="Aumentar">
            <i className='bx bx-plus'></i>
          </button>
        </div>
        <div className={styles.totalWrapper}>
          <span className={styles.total}>$ {item.price * item.quantity}</span>
        </div>
        <button className={styles.removeButton} onClick={handleRemoveItem} title="Eliminar">
          <i className='bx bx-trash'></i>
        </button>
      </div>
    </>
  );
}