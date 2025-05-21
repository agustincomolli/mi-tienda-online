import ProductList from "../components/Products/ProductList";

import styles from "./Products.module.css";

export default function Products({ products }) {
  return (
    <div className="pageContent">
      <h2 className={styles.title}>Productos Disponibles</h2>
      {/* Lista de productos, recibe la función para agregar al carrito */}
      <ProductList products={products} />
    </div>
  )
}