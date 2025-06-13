import styles from "./Paginator.module.css";

/**
 * Componente Paginator - Navegación entre páginas
 * 
 * Muestra controles de paginación con botones anterior/siguiente y números de página.
 * Se adapta automáticamente a diferentes tamaños de pantalla:
 * - Móviles: Muestra hasta 3 botones de página
 * - Tablets/Desktop: Muestra hasta 5 botones de página
 * 
 * @param {Object} props - Propiedades del componente
 * @param {number} props.currentPage - Página actual seleccionada (1-indexed)
 * @param {number} props.totalPages - Total de páginas disponibles
 * @param {Function} props.onPageChange - Función callback que se ejecuta al cambiar de página
 */
export default function Paginator({ currentPage, totalPages, onPageChange }) {

  /**
   * Calcula qué números de página mostrar en los botones
   * Centra los botones alrededor de la página actual cuando es posible
   * 
   * @returns {Array<number>} Array con los números de página a mostrar
   */
  function getPageNumbers() {
    // Máximo de botones a generar (CSS se encarga del responsive)
    const maxButtons = 5;

    // Calcula la página de inicio centrada alrededor de la página actual
    let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let end = start + maxButtons - 1;

    // Ajusta el rango si se excede del total de páginas
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxButtons + 1);
    }

    // Genera array con los números de página
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  const pageNumbers = getPageNumbers();

  return (
    <nav className={styles.pagination}>
      <ul>
        {/* Botón "Anterior" */}
        <li>
          <button
            className={styles.prev}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            title="Anterior"
          >
            <i className="bx bxs-chevron-left"></i>
          </button>
        </li>

        {/* Botones de números de página */}
        {pageNumbers.map((page, index) => (
          <li
            key={page}
            // Oculta botones extras en móviles (del 4º en adelante)
            className={index >= 3 ? styles.hiddenOnMobile : ''}
          >
            <button
              className={`${styles.pageNumbers} ${currentPage === page ? styles.active : ""}`}
              onClick={() => onPageChange(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Botón "Siguiente" */}
        <li>
          <button
            className={styles.next}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            title="Siguiente"
          >
            <i className="bx bxs-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}