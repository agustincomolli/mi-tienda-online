import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFeaturedProducts } from "../api/products";

import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import ProductList from "../components/Products/ProductList";

import styles from "./Home.module.css";

export default function Home({ addToCart }) {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTopProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchFeaturedProducts();
        setTopProducts(data.products);
        setError(null);
      } catch (err) {
        setError(err.message);
        setTopProducts([])
      } finally {
        setLoading(false);
      }
    };
    getTopProducts();
  }, []);

  return (
    <>
      <section className={styles.hero}>
        <h2>Bienvenido a Mi Tienda Online</h2>
        <p>
          Encuentra los mejores productos con las mejores ofertas. ¡Explora nuestro catálogo y descubre todo lo que
          tenemos para ti!
        </p>
        <Link to="/products" className="btn btn-primary">Vea Nuestros Productos</Link>
      </section>

      <section className={styles.featuredCategories}>
        <div className={styles.categoryCard}>
          <img src="https://picsum.photos/100?category=tech" alt="Tecnología" />
          <h3>Tecnología</h3>
        </div>
        <div className={styles.categoryCard}>
          <img src="https://picsum.photos/100?category=fashion" alt="Moda" />
          <h3>Moda</h3>
        </div>
        <div className={styles.categoryCard}>
          <img src="https://picsum.photos/100?category=home" alt="Hogar" />
          <h3>Hogar</h3>
        </div>
        <div className={styles.categoryCard}>
          <img src="https://picsum.photos/100?category=sports" alt="Deportes" />
          <h3>Comestibles</h3>
        </div>
      </section>

      <section className={styles.featuredProducts}>
        <h2>Productos Destacados</h2>
        {loading && <LoadingSpinner message="Cargando productos.." />}
        {error && <ErrorMessage message={error} />}
        {/* Lista de productos, recibe la función para agregar al carrito */}
        <ProductList products={topProducts} addToCart={addToCart} />
      </section>

      <section className={styles.banners}>
        <div className={styles.banner}>
          <img src="https://picsum.photos/300?banner=1" alt="Banner 1" />
          <h3>Ofertas de Temporada</h3>
          <p>¡No te pierdas nuestras increíbles ofertas de temporada! Descuentos de hasta el 50% en productos
            seleccionados.</p>
          <a href="#" className="btn btn-primary">Ver Ofertas</a>
        </div>
        <div className={styles.banner}>
          <img src="https://picsum.photos/300?banner=2" alt="Banner 2" />
          <h3>Nuevos Productos</h3>
          <p>Descubre las últimas novedades en nuestro catálogo. ¡Productos innovadores que te encantarán!</p>
          <a href="#" className="btn btn-primary">Ver Nuevos Productos</a>
        </div>
      </section>
    </>
  )
}