import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

import styles from "./ProductCard.module.css"

/**
 * Componente que representa un solo producto.
 * Muestra la información del producto y un botón para agregarlo al carrito.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.product - Objeto con los datos del producto.
 */
export default function ProductCard({ product, onEdit, onDelete }) {
    const { addToCart } = useContext(CartContext)
    const { currentUser, isAdmin } = useContext(AuthContext);

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
                <h3 className="heading-3">{product.title}</h3>
            </Link>
            {/* Footer: precio y botón */}
            <div className={styles.productCardFooter}>
                <p className="paragraph">$ {product.price}</p>
                {currentUser && isAdmin ? (
                    <div className={styles.buttonWrapper}>
                        <button className="btn btn-primary" onClick={() => onEdit(product.id)}>
                            <i className='bx bx-edit'></i> Editar
                        </button>
                        <button className="btn btn-danger" onClick={() => onDelete(product.id)}>
                            <i className='bx bx-trash'></i> Eliminar
                        </button>
                    </div>
                ) : (
                    <button className={`btn btn-success`} onClick={handleClick}>
                        Agregar al Carrito
                    </button>
                )}
            </div>
        </div >
    );
}