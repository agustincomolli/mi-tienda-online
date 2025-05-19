import { useState } from "react";
import styles from "./CartDetail.module.css";

export default function CartDetail({ items, setItems }) {
  const [showPromotionalCode, setShowPromotionalCode] = useState(false);
  const [showCartNote, setShowCartNote] = useState(false);

  function togglePromotionalCode() {
    setShowPromotionalCode(!showPromotionalCode);
  };

  function toggleCartNote() {
    setShowCartNote(!showCartNote)
  }

  return (
    <div className="pageContent">
      <h2>Carrito de compras</h2>
      {items.length < 1 ? (
        <p className={styles.emptyCartMessage}>Tu carrito de compras esta vacío.</p>
      ) : (
        <section className={styles.cart}>
          <article className={styles.cartItems}>
            <header className={styles.cartItemsHeader}>
              <h3>Mi carrito</h3>
            </header>
            <main className={styles.cartItemsDetails}>
              <ul className={styles.products}>
                {items.map(item => (
                  <li key={item.id} className={styles.productItem}>
                    {item.title}
                  </li>
                ))}
              </ul>
            </main>
            <footer className={styles.cartActions}>
              <button className={styles.cartActionButton} onClick={togglePromotionalCode}>
                <span><i className='bx bx-purchase-tag bx-rotate-90'></i></span>
                <span>Ingresar código promocional</span>
              </button>
              {showPromotionalCode &&
                <div className={`${styles.promotionalCode} ${styles.hidden}`}>
                  <input type="text" className={styles.promotionalCodeText} name="promotional-code" id="promotional-code"
                    autocomplete="on" placeholder="Código promocional" />
                  <button className={styles.promotionalCodeButton} id="apply-promotional-code">Aplicar</button>
                </div>
              }
              <button className={styles.cartActionButton} onClick={toggleCartNote}>
                <span><i className='bx bx-file'></i></span>
                <span>Agregar una nota</span>
              </button>
              {showCartNote &&
                <textarea className={`${styles.cartNote} ${styles.hidden}`} name="cart-note" id="cart-note"
                  placeholder="P. ej., Dejar el pedido en la puerta" maxlength="250" rows="3">
                </textarea>
              }
            </footer>
          </article>

          <aside className={styles.cartSummary}>
            <header className={styles.cartSummaryHeader}>

            </header>
            <main className={styles.cartSummarySubtotal}>

            </main>
            <footer className={styles.cartSummaryTotal}>

            </footer>
          </aside>
        </section>
      )}
    </div>
  );
}