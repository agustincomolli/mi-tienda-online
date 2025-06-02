/**
 * Obtiene todos los productos desde la API.
 * @returns {Promise<Object>} Promesa que resuelve con el listado de productos.
 * @throws {Error} Si ocurre un error en la petición.
 */
export async function fetchAllProducts() {
  const API_URL = "https://dummyjson.com/products"
  const response = await fetch(API_URL);
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
  const API_URL = `https://dummyjson.com/products?limit=${limit}&skip=${skip}&sortBy=rating&order=desc`
  const response = await fetch(API_URL);
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
  const API_URL = `https://dummyjson.com/products/${id}`
  const response = await fetch(API_URL);
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
  let api_url = "https://dummyjson.com/products";
  if (category) {
    api_url = `https://dummyjson.com/products/category/${encodeURIComponent(category)}`;
    if (q) api_url += `?q=${encodeURIComponent(q)}`;
  } else if (q) {
    api_url += `/search?q=${encodeURIComponent(q)}`;
  }
  const response = await fetch(api_url);
  if (!response.ok) throw new Error("Error al buscar productos");
  return response.json();
}

/**
 * Obtiene los productos más nuevos desde la API.
 * @returns {Promise<Object>} Promesa que resuelve con los productos más recientes.
 * @throws {Error} Si ocurre un error en la petición.
 */
export async function fetchNewProducts() {
  const API_URL = "https://dummyjson.com/products?limit=10&sortBy=id&order=desc"
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("No hay productos");
  return response.json();
}

/**
 * Obtiene los productos con mayor descuento desde la API.
 * @returns {Promise<Object>} Promesa que resuelve con los productos en oferta.
 * @throws {Error} Si ocurre un error en la petición.
 */
export async function fetchOfferts() {
  const API_URL = "https://dummyjson.com/products?limit=10&sortBy=discountPercentage&order=desc"
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("No hay productos");
  return response.json();
}

/**
 * Agrega un nuevo producto utilizando la API de DummyJSON.
 * 
 * @async
 * @function
 * @param {Object} newProduct - Objeto que representa el nuevo producto a agregar.
 * @returns {Promise<Object>} Una promesa que resuelve con la respuesta de la API simulada.
 * @throws {Error} Lanza un error si la respuesta de la API no es exitosa.
 * 
 * @description
 * Esta función envía una solicitud POST a la API de DummyJSON para simular la adición de un nuevo producto.
 * Nota: La operación no es persistente y solo sirve para fines de simulación.
 */
export async function fetchAddNewProduct(newProduct) {
  // URL de DummyJSON para agregar productos (NO PERSISTENTE, solo para simulación)
  const DUMMYJSON_URL = 'https://dummyjson.com/products/add';
  const response = await fetch(DUMMYJSON_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.json().message || response.statusText}`);
  }

  return response.json();
}