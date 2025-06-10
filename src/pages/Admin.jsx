import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

import ProductAdminTable from "../components/ProductAdminTable/ProductAdminTable";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

import Swal from 'sweetalert2';

import styles from "./Admin.module.css";


export default function Admin() {
  const {
    products,
    loading,
    error,
    setError,
    setLoading,
    setProducts,
    getProductsByQuery,
    removeProduct
  } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  async function handleSearch(event) {
    event.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const data = await getProductsByQuery({ q: searchTerm });
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
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
        await removeProduct(productId);
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