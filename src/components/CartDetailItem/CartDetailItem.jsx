import styles from "./CartDetailItem.module.css";

export default function CartDetailItem() {
  return (
    <div>
      <div className={styles.image}>
        <img src="../assets/images//martin-fierro.webp" alt="Martin Fierro" height="100px"/>
      </div>
      <div className={styles.details}>
        <div className={styles.info}>
          <span className={styles.title}>Martin Fierro</span>
          <span className={styles.price}>$ 0,00</span>
        </div>
        <div className={styles.quantity}>
          <button className={styles.quantityButton} id="decrease" title="Disminuir"><i className='bx bx-minus'></i></button>
          <span className={styles.quantityValue}>1</span>
          <button className={styles.quantityButton} id="increase" title="Aumentar"><i className='bx bx-plus'></i></button>
        </div>
        <div className={styles.totalWrapper}>
          <span className={styles.total}>$ 0,00</span>
        </div>
      </div>
      <button className={styles.removeButton} title="Eliminar"><i className='bx bx-trash'></i></button>
    </div>
  );
}