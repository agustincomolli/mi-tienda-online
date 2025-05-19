import styles from "./Main.module.css"

/**
 * Componente que envuelve el contenido principal de la página.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {ReactNode} props.children - Elementos hijos a renderizar.
 */
export default function Main({ children }) {
    return (
        <main className={styles.main}>
            {children}
        </main>
    );
}