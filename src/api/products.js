/**
 * Obtiene todos los productos desde la API.
 * @returns {Promise<Object>} Promesa que resuelve con el listado de productos.
 * @throws {Error} Si ocurre un error en la petición.
 */
export async function fetchAllProducts() {
  const response = await fetch("https://dummyjson.com/products");
  if (!response.ok) throw new Error("Error al cargar productos");
  return response.json();
}

/**
 * Obtiene productos destacados desde la API.
 * @param {Object} [params] - Parámetros para la consulta.
 * @param {number} [params.limit=3] - Cantidad de productos a traer.
 * @param {number} [params.skip=0] - Cantidad de productos a omitir.
 * @returns {Promise<Object>} Promesa que resuelve con los productos destacados.
 * @throws {Error} Si ocurre un error en la petición.
 */
export async function fetchFeaturedProducts({ limit = 3, skip = 0 } = {}) {
  const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&sortBy=rating&order=desc`);
  if (!response.ok) throw new Error("Error al cargar productos destacados");
  return response.json();
}

/**
 * Obtiene el detalle de un producto por su id desde la API.
 * @param {number|string} id - ID del producto a buscar.
 * @returns {Promise<Object>} Promesa que resuelve con el producto encontrado.
 * @throws {Error} Si ocurre un error en la petición o el producto no existe.
 */
export async function fetchProductById(id) {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) throw new Error("Producto no encontrado");
  return response.json();
}

/**
 * Busca productos por término o categoría.
 * @param {Object} params - Parámetros de búsqueda.
 * @param {string} [params.q] - Término de búsqueda.
 * @param {string} [params.category] - Categoría.
 * @returns {Promise<Object>} Productos filtrados.
 */
export async function fetchProductsByQuery({ q = "", category = "" } = {}) {
  let url = "https://dummyjson.com/products";
  if (category) {
    url = `https://dummyjson.com/products/category/${encodeURIComponent(category)}`;
    if (q) url += `?q=${encodeURIComponent(q)}`;
  } else if (q) {
    url += `/search?q=${encodeURIComponent(q)}`;
  }
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error al buscar productos");
  return response.json();
}

