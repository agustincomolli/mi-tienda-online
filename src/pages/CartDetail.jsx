import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

import CartDetailItem from "../components/CartDetailItem/CartDetailItem";

import styles from "./CartDetail.module.css";

/**
 * Página de detalle del carrito de compras.
 * 
 * - Muestra los productos agregados al carrito.
 * - Permite ingresar un código promocional.
 * - Permite agregar una nota al pedido.
 * - Muestra un resumen del pedido (subtotal, envío, total).
 * 
 * Estados:
 * - showPromotionalCode: Muestra/oculta el campo para código promocional.
 * - showCartNote: Muestra/oculta el campo para agregar una nota.
 * 
 * Contexto:
 * - cartItemsList: Lista de productos en el carrito, obtenido desde CartContext.
 * 
 * @returns {JSX.Element} Componente de detalle del carrito.
 */
export default function CartDetail() {
  // Obtiene la lista de productos del carrito desde el contexto
  const { cartItemsList } = useContext(CartContext);

  // Estado para mostrar/ocultar el campo de código promocional
  const [showPromotionalCode, setShowPromotionalCode] = useState(false);
  // Estado para mostrar/ocultar el campo de nota del carrito
  const [showCartNote, setShowCartNote] = useState(false);

  /**
   * Alterna la visibilidad del campo para ingresar código promocional.
   */
  function togglePromotionalCode() {
    setShowPromotionalCode(!showPromotionalCode);
  };

  /**
   * Alterna la visibilidad del campo para agregar una nota al carrito.
   */
  function toggleCartNote() {
    setShowCartNote(!showCartNote)
  }

  // Renderiza el contenido del carrito
  return (
    <div className="pageContent">
      <h2>Carrito de compras</h2>
      {/* Si el carrito está vacío, muestra un mensaje */}
      {cartItemsList.length < 1 ? (
        <p className={styles.emptyCartMessage}>Tu carrito de compras esta vacío.</p>
      ) : (
        <section className={styles.cart}>
          {/* Lista de productos en el carrito */}
          <article className={styles.cartItems}>
            <header className={styles.cartItemsHeader}>
              <h3>Mi carrito</h3>
            </header>
            <main className={styles.cartItemsDetails}>
              <ul className={styles.products}>
                {cartItemsList.map(item => (
                  <li key={item.id} className={styles.productItem}>
                    <CartDetailItem item={item} />
                  </li>
                ))}
              </ul>
            </main>
            <footer className={styles.cartActions}>
              {/* Botón para mostrar/ocultar código promocional */}
              <button className={styles.cartActionButton} onClick={togglePromotionalCode}>
                <span><i className='bx bx-purchase-tag bx-rotate-90'></i></span>
                <span>Ingresar código promocional</span>
              </button>
              {showPromotionalCode &&
                <div className={`${styles.promotionalCode} ${styles.hidden}`}>
                  <input type="text" className={styles.promotionalCodeText} name="promotional-code" id="promotional-code"
                    autoComplete="on" placeholder="Código promocional" />
                  <button className={styles.promotionalCodeButton} id="apply-promotional-code">Aplicar</button>
                </div>
              }
              {/* Botón para mostrar/ocultar nota del carrito */}
              <button className={styles.cartActionButton} onClick={toggleCartNote}>
                <span><i className='bx bx-file'></i></span>
                <span>Agregar una nota</span>
              </button>
              {showCartNote &&
                <textarea className={`${styles.cartNote} ${styles.hidden}`} name="cart-note" id="cart-note"
                  placeholder="P. ej., Dejar el pedido en la puerta" maxLength="250" rows="3">
                </textarea>
              }
            </footer>
          </article>

          {/* Resumen del pedido */}
          <aside className={styles.cartSummary}>
            <header className={styles.cartSummaryHeader}>
              <h3>Resumen del pedido</h3>
            </header>
            <main className={styles.cartSummarySubtotal}>
              <dl>
                <dt>Subtotal</dt>
                <dd className="cart-subtotal-value">$ 0,00</dd>
              </dl>
              <dl>
                <button className={styles.calculateShipping}>Calcular envío</button>
              </dl>
              <dl>
                <dt>Envío</dt>
                <dd className="cart-shipping-value">$ 0,00</dd>
              </dl>
            </main>
            <footer className={styles.cartSummaryTotal}>
              <dl>
                <dt>Total</dt>
                <dd className="total-value">$ 0,00</dd>
              </dl>
              <dl>
                <button className={styles.finalizePurchase}>Finalizar compra</button>
              </dl>
              <p className={styles.securePayment}><i className='bx bxs-lock-alt'></i> Pago seguro</p>
            </footer>
          </aside>
        </section>
      )}
    </div>
  );
}