import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import FormProduct from "../components/FormProduct/FormProduct";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

import Swal from 'sweetalert2';

export default function Add() {
  const {loading, setLoading, error, setError, addProduct} = useContext(ProductContext);

  const navigate = useNavigate();

  async function handleProductAdded(newProduct) {
    try {
      setLoading(true);
      setError(null);
      const result = await addProduct(newProduct);
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

  /**
 * Función para manejar la cancelación del formulario
 */
  function handleCancel() {
    navigate("/products");
  }

  return (
    <div className="pageContent">
      {loading && <LoadingSpinner message="Agregando productos..." />}
      {error && <ErrorMessage message={error} />}
      <FormProduct onProductAdded={handleProductAdded} onCancel={handleCancel} />
    </div>
  );
}