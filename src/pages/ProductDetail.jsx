import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getProductById } from "../api/products";
import { CartContext } from "../context/CartContext";
import { Helmet } from "@dr.pogodin/react-helmet";

import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

import styles from "./ProductDetail.module.css"

/**
 * Componente que muestra el detalle de un producto seleccionado.
 * Obtiene el producto por su id desde la API y permite agregarlo al carrito.
 */
export default function ProductDetail() {
  const { addToCart } = useContext(CartContext);
  // Obtiene el parámetro 'id' de la URL
  const { id } = useParams();

  // Estado para almacenar el producto obtenido
  const [product, setProduct] = useState({});
  // Estado para indicar si se está cargando el producto
  const [loading, setLoading] = useState(false);
  // Estado para guardar un posible error al cargar el producto
  const [error, setError] = useState(null);

  /**
   * useEffect para obtener el producto cuando cambia el id.
   * Llama a la API y maneja los estados de carga y error.
   */
  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id); // Llama a la API con el id
        setProduct(data); // Guarda el producto en el estado
        setError(null);   // Limpia errores anteriores
      } catch (err) {
        setError(err.message); // Guarda el mensaje de error
        setProduct({});        // Limpia el producto si hay error
      } finally {
        setLoading(false);     // Indica que la carga ha finalizado
      }
    };
    getProduct();
  }, [id]);

  /**
   * Convierte un string a formato "Title Case" (primera letra de cada palabra en mayúscula).
   * @param {string} str - Texto a transformar.
   * @returns {string} Texto en formato título.
   */
  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  /**
   * Maneja el click en el botón "Agregar al carrito".
   * Llama a la función addToCart con el producto actual.
   * @param {object} event - Evento de click.
   */
  function handleClick(event) {
    event.stopPropagation(); // Evita que el click en el botón navegue
    addToCart(product)
  };

  /**
   * Genera un arreglo de íconos de estrellas para representar visualmente una calificación.
   *
   * @param {number} rating - Calificación numérica (puede incluir decimales) entre 0 y 5.
   * @returns {JSX.Element[]} Arreglo de elementos JSX que representan estrellas llenas, medias y vacías.
   */
  function renderStars(rating) {
    const maxStars = 5;
    const filledStars = Math.floor(rating);
    const halfStar = rating - filledStars >= 0.5;
    const emptyStars = maxStars - filledStars - (halfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<i key={`filled-${i}`} className={`bx bxs-star ${styles.star}`}></i>);
    }

    if (halfStar) {
      stars.push(<i key="half" className={`bx bxs-star-half ${styles.star}`}></i>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className={`bx bx-star ${styles.star}`}></i>);
    }

    return stars;
  }

  // Renderizado del componente
  return (
    <>
      <Helmet>
        <title>Mi Tienda Online | Detalles</title>
      </Helmet>

      <div className="pageContent">
        {/* Muestra spinner de carga si está cargando */}
        {loading && <LoadingSpinner message="Cargando productos.." />}
        {/* Muestra mensaje de error si hay error */}
        {error && <ErrorMessage message={error} />}
        {/* Muestra el detalle solo si no hay carga ni error */}
        {!loading && !error && (
          <section className={styles.productDetail}>
            <img src={product.thumbnail} alt={product.title} />
            <div className={styles.productInfo}>
              <h2 className="product-name">{product.title}</h2>
              <p className="description">{product.description}</p>
              <p className="price"><strong>Precio:</strong> $ {product.price}</p>
              <p className="category">
                <strong>Categoría:</strong>{" "}
                {product.category && toTitleCase(product.category)}
              </p>
              <p className="brand"><strong>Marca:</strong> {product.brand}</p>
              <p className="rating">
                <strong>Calificación:</strong> {product.rating}{" "}
                <span>{renderStars(product.rating)}</span>
              </p>
              <div className={styles.ButtonsWrapper}>
                <button className="btn btn-success" onClick={handleClick}>Agregar al carrito</button>
                <Link className="btn btn-primary" to="/">Volver al Inicio</Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}