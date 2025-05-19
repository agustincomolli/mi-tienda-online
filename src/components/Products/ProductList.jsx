import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css"

/**
 * Componente que muestra la lista de productos disponibles.
 * Recibe los productos y la función para agregar al carrito como props.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Array} props.products - Lista de productos a mostrar.
 * @param {Function} props.addToCart - Función para agregar un producto al carrito.
 */
export default function ProductList({ products, addToCart }) {
    return (
        <div className={styles.productsGrid}>
            {/* Itera sobre el array de productos y renderiza un componente ProductCard por cada uno */}
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                />
            ))}
        </div>
    );
}