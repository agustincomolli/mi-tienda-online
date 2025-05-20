import { useState } from "react";

import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  // Estado que contiene la lista de productos agregados al carrito.
  const [cartItemsList, setCartItemsList] = useState([])
  
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
   * Calcula el subtotal sumando el precio por la cantidad de cada producto.
   * @returns {string} Subtotal formateado con dos decimales.
   */
  function getSubtotal() {
    let subtotal = 0;
    // Recorre todos los productos y suma el total de cada uno.
    cartItemsList.forEach(item => {
      subtotal += item.price * item.quantity
    });
    return subtotal.toFixed(2)
  };

  /**
   * Elimina un producto del carrito por su id.
   * @param {number} id - ID del producto a eliminar.
   */
  function removeItem(id) {
    // Filtra el producto que no coincide con el id recibido.
    setCartItemsList(cartItemsList.filter(item => item.id !== id))
  };

  /**
   * Actualiza la cantidad de un producto en el carrito.
   * Si la nueva cantidad es menor a 1, no hace nada.
   * @param {number} id - ID del producto a actualizar.
   * @param {number} newQuantity - Nueva cantidad para el producto.
   */
  function updateQuantity(id, newQuantity) {
    if (newQuantity < 1) return;
    // Mapea los productos y actualiza solo el que coincide con el id.
    setCartItemsList(
      cartItemsList.map(
        item => item.id === id ? { ...item, quantity: newQuantity } : item
      ));
  };

  return (
    <CartContext.Provider value={{ cartItemsList, addToCart, getTotalItemCount, getSubtotal, removeItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}