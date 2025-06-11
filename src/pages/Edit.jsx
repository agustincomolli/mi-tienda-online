import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

import FormProduct from "../components/FormProduct/FormProduct";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

import Swal from 'sweetalert2';

export default function Edit() {
  const { getProductById, editProduct } = useContext(ProductContext);
  // Obtiene el parámetro 'id' de la URL
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
 * useEffect para obtener el producto cuando cambia el id.
 * Llama a la API y maneja los estados de carga y error.
 */
  useEffect(() => {
    async function getProduct() {
      try {
        setLoading(true);
        setError(null);   // Limpia errores anteriores
        const data = await getProductById(id); // Llama a la API con el id
        setProduct(data); // Guarda el producto en el estado
      } catch (err) {
        setError(err.message); // Guarda el mensaje de error
        setProduct({});        // Limpia el producto si hay error
      } finally {
        setLoading(false);     // Indica que la carga ha finalizado
      }
    };
    getProduct();
  }, [id, getProductById]);

  async function handleProductUpdated(product) {
    try {
      setLoading(true);
      setError(null);
      const message = `<p class="paragraph">El producto <strong>${product.title}</strong> se actualizó correctamente</p>`
      const result = await editProduct(product);
      console.log('Producto actualizado:', result);
      await Swal.fire({
        title: "Producto actualizado",
        html: message,
        icon: "success",
        confirmButtonText: "Continuar",
        customClass: {
          confirmButton: 'swal-btn-confirm',
        }
      });
      navigate("/products");
    } catch (err) {
      setError(err.message);
      console.error('Error al actualizar producto:', err);
    } finally {
      setLoading(false);
    }
  }

  // Función para manejar la cancelación de la edición
  function handleCancel() {
    navigate("/products");
  }

  return (
    <div className="pageContent">
      {/* Muestra spinner de carga si está cargando */}
      {loading && <LoadingSpinner message="Cargando productos.." />}
      {/* Muestra mensaje de error si hay error */}
      {error && <ErrorMessage message={error} />}
      {/* Muestra el detalle solo si no hay carga ni error */}
      {!loading && !error && (
        <FormProduct
          initialProduct={product}
          onProductUpdated={handleProductUpdated}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}