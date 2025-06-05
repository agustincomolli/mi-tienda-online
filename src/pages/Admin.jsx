import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAddNewProduct, fetchAllProducts, fetchProductsByQuery } from "../api/products";

import FormProduct from "../components/FormProduct/FormProduct";
import ProductAdminTable from "../components/ProductAdminTable/ProductAdminTable";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import Accordion from "../components/Accordion/Accordion";

import Swal from 'sweetalert2';

import styles from "./Admin.module.css";


export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  /**
 * Función asíncrona para obtener los productos desde la API.
 * Maneja el estado de carga y posibles errores.
 */
  async function loadProducts(query = "") {
    try {
      setLoading(true) // Indica que la carga ha comenzado
      setError(null);
      let data;
      if (query.trim().length === 0) {
        data = await fetchAllProducts();
      } else {
        data = await fetchProductsByQuery({ q: query });
      }
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar productos:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Obtiene los productos desde la API al montar el componente.
   * Maneja los estados de carga y error.
   */
  useEffect(() => {
    loadProducts();
    // El array vacío [] significa que este efecto solo se ejecuta al montar el componente
  }, [])

  // URL de DummyJSON para agregar productos (NO PERSISTENTE, solo para simulación)
  const DUMMYJSON_URL = 'https://dummyjson.com/products/add';

  async function handleProductAdded(newProduct) {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchAddNewProduct(newProduct);
      console.log('Producto agregado:', result);
      // Opcional: actualizar la lista de productos aquí
      await Swal.fire({
        title: "Producto agregado",
        html: `<p class="paragraph">El producto <strong>${result.title}</strong> se agregó con el ID: <strong>${result.id}</strong></p>`,
        icon: "success",
        confirmButtonText: "Continuar",
        customClass: {
          confirmButton: 'swal-btn-confirm',
        }
      });
      navigate("/products");
    } catch (err) {
      setError(err.message);
      console.error('Error al agregar producto:', error);
    } finally {
      setLoading(false);
    }
  };

  function handleSearch(event) {
    event.preventDefault();
    if (searchTerm.trim()) {
      loadProducts(searchTerm);
    }
  }

  return (
    <div className="pageContent">
      <h2 className="heading-2">Administración de Mi Tienda Online</h2>
      <p className="paragraph">
        Desde este lugar podrás administrar los productos del sitio, agregando,
        modificando o eliminado items.
      </p>
      {/* Agregar un producto nuevo */}
      <Accordion className={styles.accordion} title="Agregar producto" defaultOpen={false}>
        {loading && <LoadingSpinner message="Agregando productos..." />}
        {error && <ErrorMessage message={error} />}
        <FormProduct onProductAdded={handleProductAdded} />
      </Accordion>

      {/* Tabla de productos */}
      <Accordion className={styles.accordion} title="Listado de productos">
        <form onSubmit={handleSearch} className={styles.searchBar}>
          <input
            type="text"
            name="to-search"
            placeholder="¿Qué productos deseas modificar?"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary" title="Buscar productos">
            <i className='bx bx-search'></i>
          </button>
        </form>
        {loading && <LoadingSpinner message="Agregando productos..." />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && products.length === 0 && (
          <p className={styles.message}>No se encontraron productos.</p>
        )}
        {!loading && !error && products.length > 0 && (
          <ProductAdminTable
            products={products}
          />
        )}
      </Accordion>
    </div>
  );
}