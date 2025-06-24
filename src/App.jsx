import { useState, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ProductContext } from "./context/ProductContext";

import About from "./pages/About";
import Add from "./pages/Add";
import CartDetail from "./pages/CartDetail";
import Contact from "./pages/Contact";
import Edit from "./pages/Edit";
import Faq from "./pages/Faq";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Policies from "./pages/Policies";
import Products from "./pages/Products";
import SearchResults from "./pages/SearchResults";
import ProductDetail from "./pages/ProductDetail";
import Terms from "./pages/Terms";
import Register from "./pages/Register";

import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import 'boxicons/css/boxicons.min.css';
import Swal from 'sweetalert2';

/**
 * Componente principal de la aplicación.
 * 
 * - Administra el estado global del carrito y la visibilidad del mismo usando useState.
 * - Obtiene los productos desde una API al montar el componente usando useEffect.
 * - Maneja los estados de carga y error para la obtención de productos.
 * - Define las rutas principales de la aplicación usando React Router:
 *   - "/"           : Página principal (Home).
 *   - "/products"   : Lista de productos (Products).
 *   - "/products/:id": Detalle de producto.
 *   - "/faq"        : Preguntas frecuentes.
 *   - "/terms"      : Términos y condiciones.
 *   - "/policies"   : Políticas de privacidad.
 *   - "/about"      : Sobre nosotros.
 *   - "/contact"    : Contacto.
 * 
 * Props y funciones importantes:
 * - toggleCart: Alterna la visibilidad del carrito.
 * - getProductsComponent: Renderiza el contenido de la página de productos según el estado (cargando, error, datos).
 */
function App() {
  // Estado para mostrar u ocultar el carrito de compras.
  const [showCart, setShowCart] = useState(false);
  const { products, removeProduct, loading, error } = useContext(ProductContext);
  const navigate = useNavigate();

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

  /**
   * Alterna la visibilidad del carrito de compras.
   */
  function toggleCart() {
    setShowCart(!showCart);
  };

  /**
   * Renderiza el componente adecuado para la página de productos según el estado.
   * Si está cargando, muestra un spinner.
   * Si hay error, muestra el mensaje de error.
   * Si hay productos, muestra el listado de productos.
   * 
   * @param {Object} params - Parámetros para renderizar el componente.
   * @param {boolean} params.loading - Indica si los datos se están cargando.
   * @param {string|null} params.error - Mensaje de error si ocurrió alguno.
   * @param {Array} params.products - Lista de productos a mostrar.
   * @returns {JSX.Element} El componente correspondiente según el estado.
   */
  function getProductsComponent({ loading, error, products }) {
    if (loading) {
      return (
        <LoadingSpinner message="Cargando productos.." />
      );
    }
    if (error) {
      return (
        <ErrorMessage message={error} />
      );
    }
    return (
      <Products
        products={products}
      />
    );
  }

  // Renderiza la estructura principal de la app y define las rutas.
  return (
    <>
      <Layout
        toggleCart={toggleCart}
        showCart={showCart}
        setShowCart={setShowCart}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={getProductsComponent({ loading, error, products })} />
          {/* Ruta dinámica */}
          <Route path="/products/:id" element={
            <ProductDetail
              onEdit={handleEdit}
              onDelete={handleDelete} />
          } />
          <Route path="/about" element={<About />} />
          {/* Ruta protegida, hay que iniciar sesión para acceder */}
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<CartDetail />} />
            {/* <Route path="/admin" element={<Admin />}></Route> */}
            <Route path="/admin/edit/:id" element={<Edit />} />
            <Route path="/admin/add" element={<Add />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
