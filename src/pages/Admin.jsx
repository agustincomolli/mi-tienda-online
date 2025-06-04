import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAddNewProduct, fetchAllProducts } from "../api/products";

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

  /**
 * Función asíncrona para obtener los productos desde la API.
 * Maneja el estado de carga y posibles errores.
 */
  async function loadProducts() {
    try {
      setLoading(true) // Indica que la carga ha comenzado
      setError(null);
      const data = await fetchAllProducts();
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
      navigate("/admin");
    } catch (err) {
      setError(err.message);
      console.error('Error al agregar producto:', error);
    } finally {
      setLoading(false);
    }
  };

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
        <FormProduct onProductAdded={handleProductAdded} defaultOpen={false} />
      </Accordion>
      
      {/* Tabla de productos */}
      <Accordion className={styles.accordion} title="Listado de productos">
        {loading && <LoadingSpinner message="Agregando productos..." />}
        {error && <ErrorMessage message={error} />}
        <ProductAdminTable
          products={products}
        />
      </Accordion>
    </div>
  );
}