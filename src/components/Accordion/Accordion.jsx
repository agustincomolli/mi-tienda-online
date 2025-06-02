import { useRef, useState, useEffect } from "react";
import styles from "./Accordion.module.css";

/**
 * Componente Accordion
 *
 * Un acordeón reutilizable que muestra u oculta su contenido con animación.
 * Usa estilos del sitio y animación suave de altura.
 *
 * Props:
 * - title: string. Título del acordeón.
 * - children: contenido a mostrar dentro del acordeón.
 * - defaultOpen: boolean (opcional). Si el acordeón debe estar abierto al inicio.
 */
export default function Accordion({ title, children, defaultOpen = false }) {
  // Estado para controlar si el acordeón está abierto o cerrado
  const [open, setOpen] = useState(defaultOpen);
  // Estado para la altura máxima del contenido (para animación)
  const [maxHeight, setMaxHeight] = useState(0);
  // Referencia al contenedor del contenido
  const contentRef = useRef(null);

  // Efecto para actualizar la altura máxima cuando cambia el estado o el contenido
  useEffect(() => {
    if (open && contentRef.current) {
      // Si está abierto, ajusta la altura al scrollHeight del contenido
      setMaxHeight(contentRef.current.scrollHeight);
    } else {
      // Si está cerrado, altura 0
      setMaxHeight(0);
    }
  }, [open, children]);

  return (
    <section className={styles.accordion}>
      {/* Botón que alterna el estado abierto/cerrado */}
      <button
        className={styles.accordionToggle}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        type="button"
      >
        {title}
        {/* Flecha que cambia según el estado */}
        <span className={styles.accordionArrow}>
          {open ? (
            <i className="bx bxs-chevron-up"></i>
          ) : (
            <i className="bx bxs-chevron-down"></i>
          )}
        </span>
      </button>
      {/* Contenedor del contenido, con altura animada */}
      <div
        ref={contentRef}
        className={`${styles.accordionContent} ${open ? styles.open : ""}`}
        style={{ maxHeight: open ? maxHeight + "px" : 0 }}
      >
        <div className={styles.accordionInner}>{children}</div>
      </div>
    </section>
  );
}