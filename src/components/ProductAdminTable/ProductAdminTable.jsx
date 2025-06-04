import styles from "./ProductAdminTable.module.css";

export default function ProductAdminTable({ products, onEdit, onDelete }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Categoría</th>
            <th className={styles.priceHeader}>Precio</th>
            <th className={styles.actionHeader}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} className={styles.emptyMsg}>No hay productos para mostrar.</td>
            </tr>
          ) : (
            products.map(product => (
              <tr key={product.id}>
                <td data-label="Nombre">{product.title}</td>
                <td data-label="Marca">{product.brand}</td>
                <td data-label="Categoría">{product.category}</td>
                <td data-label="Precio" className={styles.price}>$ {product.price}</td>
                <td data-label="Acciones" className={styles.buttonWrapper}>
                  <button className="btn btn-primary" onClick={() => onEdit(product)}>
                    <i className='bx bx-edit'></i>
                  </button>
                  <button className="btn btn-danger" onClick={() => onDelete(product)}>
                    <i className='bx bx-trash'></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}