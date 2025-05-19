import ProductList from "../components/Products/ProductList";

import styles from "./Products.module.css";

export default function Products({ products, addToCart }) {
  return (
    <section>
      <h2 className={styles.title}>Productos Disponibles</h2>
      {/* Lista de productos, recibe la función para agregar al carrito */}
      <ProductList products={products} addToCart={addToCart} />
    </section>
  )
}