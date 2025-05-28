import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFeaturedProducts } from "../api/products";

import offers from "../assets/images/offers.webp";
import newProducts from "../assets/images/new-products.webp";
import technology from "../assets/images/technology.webp";
import fashion from "../assets/images/fashion.webp";
import home from "../assets/images/home-deco.webp";
import food from "../assets/images/food.webp";

import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import ProductList from "../components/Products/ProductList";

import styles from "./Home.module.css";

export default function Home() {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getTopProducts() {
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
    <div className="pageContent">
      <section className={styles.hero}>
        <h2>Bienvenido a Mi Tienda Online</h2>
        <p>
          Encuentra los mejores productos con las mejores ofertas. ¡Explora nuestro catálogo y descubre todo lo que
          tenemos para ti!
        </p>
        <Link to="/products" className="btn btn-primary">Vea Nuestros Productos</Link>
      </section>

      <section className={styles.featuredCategories}>
        <Link to="/search?category=smartphones" className={styles.categoryCard} title="Ver productos de esta categoría">
          <img src={technology} alt="Tecnología" />
          <h3>Tecnología</h3>
        </Link>
        <Link to="/search?category=mens-shirts" className={styles.categoryCard} title="Ver productos de esta categoría">
          <img src={fashion} alt="Moda" />
          <h3>Moda</h3>
        </Link>
        <Link to="/search?category=furniture" className={styles.categoryCard} title="Ver productos de esta categoría">
          <img src={home} alt="Hogar" />
          <h3>Hogar</h3>
        </Link>
        <Link to="/search?category=groceries" className={styles.categoryCard} title="Ver productos de esta categoría">
          <img src={food} alt="Comestibles" />
          <h3>Comestibles</h3>
        </Link>
      </section>

      <section className={styles.featuredProducts}>
        <h2>Productos Destacados</h2>
        {loading && <LoadingSpinner message="Cargando productos.." />}
        {error && <ErrorMessage message={error} />}
        {/* Lista de productos, recibe la función para agregar al carrito */}
        <ProductList products={topProducts} />
      </section>

      <section className={styles.banners}>
        <div className={styles.banner}>
          <img src={offers} alt="Ofertas" />
          <h3>Ofertas de Temporada</h3>
          <p>¡No te pierdas nuestras increíbles ofertas de temporada! Descuentos de hasta el 50% en productos
            seleccionados.</p>
          <Link to="/search?mode=news" className="btn btn-primary">Ver Ofertas</Link>
        </div>
        <div className={styles.banner}>
          <img src={newProducts} alt="Nuevos productos" />
          <h3>Nuevos Productos</h3>
          <p>Descubre las últimas novedades en nuestro catálogo. ¡Productos innovadores que te encantarán!</p>
          <Link to="/search?mode=offerts" className="btn btn-primary">Ver Nuevos Productos</Link>
        </div>
      </section>
    </div>
  )
}