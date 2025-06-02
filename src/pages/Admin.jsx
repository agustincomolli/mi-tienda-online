import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAddNewProduct } from "../api/products";

import FormProduct from "../components/FormProduct/FormProduct";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

import Swal from 'sweetalert2';

// import styles from "./Admin.module.css";


export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <div className="pageContent">
      <article>
        <h2 className="heading-2">Agregar producto</h2>
        {loading && <LoadingSpinner message="Agregando productos..." />}
        {error && <ErrorMessage message={error} />}
        <FormProduct onProductAdded={handleProductAdded} />
      </article>
    </div>
  );
}