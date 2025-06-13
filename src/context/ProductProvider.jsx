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
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(12); // cantidad de productos por página


  async function loadProducts({ page = 1, limit = 12 } = {}) {
    setLoading(true);
    setError(null);
    try {
      const skip = (page - 1) * limit;
      const data = await getProductsByQuery({ limit, skip });
      setProducts(data.products);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
      setProducts([]);
      setTotal(0);
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
    loadProducts({ page, limit });
  }, [page, limit]);

  return (
    <ProductContext.Provider value={{
      products,
      setProducts,
      loading,
      setLoading,
      error,
      page,
      setPage,
      limit,
      total,
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