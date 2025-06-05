import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../api/products";

import FormProduct from "../components/FormProduct/FormProduct";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

import Swal from 'sweetalert2';

export default function Edit() {
  // Obtiene el parámetro 'id' de la URL
  const { id } = useParams();

  // Estado para almacenar el producto obtenido
  const [product, setProduct] = useState({});
  // Estado para indicar si se está cargando el producto
  const [loading, setLoading] = useState(false);
  // Estado para guardar un posible error al cargar el producto
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
        const data = await fetchProductById(id); // Llama a la API con el id
        setProduct(data); // Guarda el producto en el estado
      } catch (err) {
        setError(err.message); // Guarda el mensaje de error
        setProduct({});        // Limpia el producto si hay error
      } finally {
        setLoading(false);     // Indica que la carga ha finalizado
      }
    };
    getProduct();
  }, [id]);

  return (
    <div className="pageContent">
      {/* Muestra spinner de carga si está cargando */}
      {loading && <LoadingSpinner message="Cargando productos.." />}
      {/* Muestra mensaje de error si hay error */}
      {error && <ErrorMessage message={error} />}
      {/* Muestra el detalle solo si no hay carga ni error */}
      {!loading && !error && (
        <FormProduct initialProduct={product} />
      )}
    </div>
  );
}