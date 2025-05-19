import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { fetchAllProducts } from "./api/products";

import About from "./pages/About";
import CartDetail from "./pages/CartDetail";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Policies from "./pages/Policies";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Terms from "./pages/Terms";

import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Main from "./components/Layout/Main";
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
 * - addToCart: Agrega productos al carrito.
 * - getTotalItemCount: Devuelve la cantidad total de productos en el carrito.
 * - getProductsComponent: Renderiza el contenido de la página de productos según el estado (cargando, error, datos).
 */
function App() {
  // Estado para mostrar u ocultar el carrito de compras.
  const [showCart, setShowCart] = useState(false);

  // Estado que contiene la lista de productos agregados al carrito.
  // Cada elemento es un objeto con id, image, name, price y quantity.
  const [cartItemsList, setCartItemsList] = useState([])

  // Estado para almacenar los productos traídos de la API
  const [products, setProducts] = useState([])
  // Estado para indicar si se están cargando los productos
  const [loading, setLoading] = useState(false)
  // Estado para guardar un posible error al cargar los productos
  const [error, setError] = useState(null)

  /**
   * Obtiene los productos desde la API al montar el componente.
   * Maneja los estados de carga y error.
   */
  useEffect(() => {
    /**
     * Función asíncrona para obtener los productos desde la API.
     * Maneja el estado de carga y posibles errores.
     */
    const fetchProducts = async () => {
      try {
        setLoading(true) // Indica que la carga ha comenzado

        const data = await fetchAllProducts();

        // Simula una demora de 4 segundos antes de mostrar los productos
        setTimeout(() => {
          setProducts(data.products);
          setError(null);
          setLoading(false);
        }, 4000);
      } catch (error) {
        setError(error.message);
        setProducts([]);
        setLoading(false);
      }
    };

    fetchProducts();
    // El array vacío [] significa que este efecto solo se ejecuta al montar el componente
  }, [])

  /**
   * Alterna la visibilidad del carrito de compras.
   */
  function toggleCart() {
    setShowCart(!showCart);
  };

  /**
   * Agrega un producto al carrito.
   * Si el producto ya existe, incrementa su cantidad.
   * Si no existe, lo agrega con cantidad 1.
   * @param {Object} product - Producto a agregar al carrito.
   */
  function addToCart(product) {
    const existingItem = cartItemsList.find(item => item.id === product.id)
    if (existingItem) {
      setCartItemsList(
        cartItemsList.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCartItemsList([...cartItemsList, { ...product, quantity: 1 }])
    }
  };

  /**
   * Calcula la cantidad total de productos en el carrito.
   * @returns {number} Suma de las cantidades de todos los productos.
   */
  function getTotalItemCount() {
    let totalQuantity = 0;
    cartItemsList.forEach(item => {
      totalQuantity += item.quantity
    });
    return totalQuantity
  }

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
   * @param {Function} params.addToCart - Función para agregar productos al carrito.
   * @param {boolean} params.showCart - Indica si el carrito está visible.
   * @param {Array} params.cartItemsList - Lista de productos en el carrito.
   * @param {Function} params.setCartItemsList - Función para actualizar el carrito.
   * @returns {JSX.Element} El componente correspondiente según el estado.
   */
  function getProductsComponent({ loading, error, products, addToCart, showCart, cartItemsList, setCartItemsList }) {
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
        addToCart={addToCart}
        showCart={showCart}
        cartItemsList={cartItemsList}
        setCartItemsList={setCartItemsList}
      />
    );
  }

  // Renderiza la estructura principal de la app y define las rutas.
  return (
    <>
      <Layout
        toggleCart={toggleCart}
        cartItemCount={getTotalItemCount()}
        showCart={showCart}
        setShowCart={setShowCart}
        cartItemsList={cartItemsList}
        setCartItemsList={setCartItemsList}
      >
        <Routes>
          <Route path="/" element={<Main><Home addToCart={addToCart} /></Main>} />
          <Route path="/products"
            element={
              <Main>
                {getProductsComponent({
                  loading, error, products, addToCart, showCart,
                  cartItemsList, setCartItemsList
                })}
              </Main>
            }
          />
          <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} />} />
          {/* Rutas estáticas para páginas informativas */}
          <Route path="/about" element={<About />} />
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<CartDetail items={cartItemsList} setItems={setCartItemsList} />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/login" element={<Login />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
