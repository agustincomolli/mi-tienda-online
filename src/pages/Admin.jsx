import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts, getProductsByQuery, deleteProduct } from "../api/products";

import ProductAdminTable from "../components/ProductAdminTable/ProductAdminTable";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

import Swal from 'sweetalert2';

import styles from "./Admin.module.css";


export default function Admin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


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
        data = await getAllProducts();
      } else {
        data = await getProductsByQuery({ q: query });
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

  function handleSearch(event) {
    event.preventDefault();
    if (searchTerm.trim()) {
      loadProducts(searchTerm);
    }
  }

  function handleAdd() {
    navigate("/admin/add");
  }

  async function handleDelete(productId) {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "swal-btn-confirm",
        cancelButton: "swal-btn-cancel"
      }
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        setError(null);
        await deleteProduct(productId);
        setProducts(products.filter(p => p.id !== productId));
        await Swal.fire({
          title: "Eliminado",
          text: "El producto fue eliminado correctamente.",
          icon: "success",
          confirmButtonText: "OK"
        });
      } catch (err) {
        setError(err.message);
        await Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el producto.",
          icon: "error",
          confirmButtonText: "OK"
        });
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="pageContent">
      <h2 className="heading-2">Administración de Mi Tienda Online</h2>
      <p className="paragraph">
        Desde este lugar podrás administrar los productos del sitio, agregando,
        modificando o eliminado items.
      </p>
      <section>
        {/* Botón para agregar producto */}
        <div className={styles.addButtonWrapper}>
          <button className="btn btn-success" onClick={handleAdd}>
            <i className="bx bx-plus"></i> Agregar producto
          </button>
        </div>
        {/* Tabla de productos */}
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
            onDelete={handleDelete}
          />
        )}
      </section>
    </div>
  );
}