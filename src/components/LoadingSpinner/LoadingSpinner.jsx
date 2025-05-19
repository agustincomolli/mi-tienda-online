import styles from "./LoadingSpinner.module.css"

export default function LoadingSpinner({ message }) {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <h2 className={styles.loadingText}>{message}</h2>
    </div>
  )
}