import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";
import { Helmet } from "@dr.pogodin/react-helmet";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import ProductList from "../components/Products/ProductList";
import Paginator from "../components/Paginator/Paginator";
import Swal from 'sweetalert2';

import styles from "./Products.module.css";

export default function Products() {
  const { currentUser, isAdmin } = useContext(AuthContext);
  const {
    products,
    loading,
    error,
    removeProduct,
    page,
    setPage,
    limit,
    total
  } = useContext(ProductContext);

  const navigate = useNavigate();

  /**
   * Navega a la página para agregar un nuevo producto en la sección de administración.
   * Utiliza la función `navigate` para redirigir al usuario a la ruta "/admin/add".
   */
  function handleAdd() {
    navigate("/admin/add");
  }

  /**
   * Navega a la página de edición del producto con el ID proporcionado.
   *
   * @param {string|number} id - El identificador único del producto a editar.
   */
  function handleEdit(id) {
    navigate(`/admin/edit/${id}`);
  }

  /**
   * Maneja la eliminación de un producto mostrando una alerta de confirmación.
   * Si el usuario confirma, intenta eliminar el producto y muestra una alerta de éxito o error según el resultado.
   * 
   * @async
   * @function
   * @param {string|number} id - El identificador único del producto a eliminar.
   * @returns {Promise<void>} No retorna ningún valor.
   */
  async function handleDelete(id) {
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
        await removeProduct(id);
        await Swal.fire({
          title: "Eliminado",
          text: "El producto fue eliminado correctamente.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "swal-btn-confirm",
          }
        });
      } catch {
        await Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el producto.",
          icon: "error",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "swal-btn-confirm",
          }
        });
      }
    }
  }

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <Helmet>
        <title>Mi Tienda Online | Productos</title>
      </Helmet>

      <div className="pageContent">
        {loading && <LoadingSpinner message="Cargando productos..." />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <>
            {currentUser && isAdmin ? (
              <>
                <h2 className="heading-2">Administración de Mi Tienda Online</h2>
                <p className="paragraph">
                  Desde este lugar podrás administrar los productos del sitio, agregando,
                  modificando o eliminado items.
                </p>
                {/* Botón para agregar producto */}
                <div className={styles.addButtonWrapper}>
                  <button className="btn btn-success" onClick={handleAdd}>
                    <i className="bx bx-plus"></i> Agregar producto
                  </button>
                </div>
              </>
            ) : (
              <h2 className={styles.title}>Productos Disponibles</h2>
            )}
            {/* Lista de productos, recibe la función para agregar al carrito */}
            <ProductList
              products={products}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <Paginator
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </>
  )
}