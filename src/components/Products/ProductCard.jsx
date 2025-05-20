import styles from "./ProductCard.module.css"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

/**
 * Componente que representa un solo producto.
 * Muestra la información del producto y un botón para agregarlo al carrito.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.product - Objeto con los datos del producto.
 */
export default function ProductCard({ product }) {
    const { addToCart } = useContext(CartContext)

    function handleClick(event) {
        event.stopPropagation(); // Evita que el click en el botón navegue
        addToCart(product)
    };

    return (
        <div className={styles.productCard}>
            <Link to={`/products/${product.id}`} title="Ver detalle">
                {/* Imagen del producto */}
                <img src={product.images[0]} alt={product.title} />
                {/* Nombre del producto */}
                <h3>{product.title}</h3>
            </Link>
            {/* Footer: precio y botón */}
            <div className={styles.productCardFooter}>
                <p>$ {product.price}</p>
                <button className={`btn btn-success`} onClick={handleClick}>Agregar al Carrito</button>
            </div>
        </div>
    );
}