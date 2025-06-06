import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getAllProducts } from "./api/products";

import About from "./pages/About";
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
import Admin from "./pages/Admin";
import Register from "./pages/Register";

import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import 'boxicons/css/boxicons.min.css';

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
  // Estado para almacenar los productos traídos de la API
  const [products, setProducts] = useState([])
  // Estado para indicar si se están cargando los productos
  const [loading, setLoading] = useState(false)
  // Estado para guardar un posible error al cargar los productos
  const [error, setError] = useState(null)

  /**
   * Función asíncrona para obtener los productos desde la API.
   * Maneja el estado de carga y posibles errores.
   */
  async function loadProducts() {
    try {
      setLoading(true) // Indica que la carga ha comenzado
      setError(null);
      const data = await getAllProducts();
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
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          {/* Ruta protegida, hay que iniciar sesión para acceder */}
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<CartDetail />} />
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="/admin/edit/:id" element={<Edit />} />
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
