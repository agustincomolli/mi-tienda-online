import styles from "./WhatsApp.module.css";

export default function WhatsApp() {
  return (
    <div className={styles.whatsapp}>
      <div className={styles.tooltip}>
        <span className={styles.tooltiptext}>¡Estamos en Whatsapp!</span>
        <a href="https://wa.me/5492226680056" target="_blank" className={`${styles.whatsappFloat} ${styles.bounce}`}>
          <i className='bx bxl-whatsapp'></i>
        </a>
      </div>
    </div>
  );
}