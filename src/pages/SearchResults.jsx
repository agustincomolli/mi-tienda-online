import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductsByQuery, getNewProducts, getOfferts } from "../api/products";
import { Helmet } from "@dr.pogodin/react-helmet";

import ProductList from "../components/Products/ProductList";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

import styles from "./SearchResults.module.css"

export default function SearchResults() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query = params.get("q");
  const category = params.get("category");
  const mode = params.get("mode");

  useEffect(() => {
    async function getSearchResults() {
      try {
        setLoading(true);
        setError(null);
        let data;
        if (mode === "news") {
          data = await getNewProducts();
        } else if (mode === "offerts") {
          data = await getOfferts();
        } else {
          data = await getProductsByQuery({ q: query, category });
        }
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
        setProducts([])
      } finally {
        setLoading(false);
      }
    };

    getSearchResults();
  }, [query, category, mode]);
  return (
    <>
      <Helmet>
        <title>Mi Tienda Online | Resultados</title>
      </Helmet>

      <div className="pageContent">
        <h2 className={styles.title}>Resultados de búsqueda</h2>
        {loading && <LoadingSpinner message="Buscando productos..." />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && products.length === 0 && (
          <p className={styles.message}>No se encontraron productos.</p>
        )}
        {!loading && !error && products.length > 0 && (
          <ProductList products={products} />
        )}
      </div>
    </>
  );
}