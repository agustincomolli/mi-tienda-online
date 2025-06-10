import { useState, useEffect } from "react";
import { ProductContext } from "./ProductContext";
import {
  getAllProducts,
  getFeaturedProducts,
  getProductById,
  getProductsByQuery,
  getNewProducts,
  getOfferts,
  addNewProduct,
  updateProduct,
  deleteProduct
} from "../api/products";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  async function loadProducts() {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllProducts();
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  async function addProduct(product) {
    const newProduct = await addNewProduct(product);
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  }

  async function editProduct(product) {
    const updated = await updateProduct(product);
    setProducts(prev =>
      prev.map(p => (p.id === updated.id ? updated : p))
    );
    return updated;
  }

  async function removeProduct(id) {
    await deleteProduct(id);
    setProducts(prev => prev.filter(p => p.id !== id));
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductContext.Provider value={{
      products,
      setProducts,
      loading,
      setLoading,
      error,
      setError,
      getAllProducts,
      getFeaturedProducts,
      getProductById,
      getProductsByQuery,
      getNewProducts,
      getOfferts,
      addProduct,
      editProduct,
      removeProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
}