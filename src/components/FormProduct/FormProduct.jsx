import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FormProduct.module.css"

/**
 * Componente de formulario para crear o editar un producto.
 * Permite ingresar nombre, descripción, imagen, precio, categoría, marca y calificación.
 * Incluye validación de campos y muestra mensajes de error.
 */
export default function FormProduct({ onProductAdded }) {
  // Hook de navegación para redirigir al usuario
  const navigate = useNavigate();

  // Estado para los datos del producto
  const [product, setProduct] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: 0,
    category: "",
    brand: "",
    rating: 3
  });

  // Estado para mostrar/ocultar el modal de imagen
  const [showModal, setShowModal] = useState(false);
  // Estado temporal para la URL de la imagen en el modal
  const [tempImageURL, setTempImageURL] = useState("");

  /**
   * Limpia el formulario y los errores de validación.
   */
  function clearForm() {
    setProduct({
      title: "",
      description: "",
      imageURL: "",
      price: 0,
      category: "",
      brand: "",
      rating: 3
    });
    setValidationErrors({});
  }

  // Estado para almacenar los errores de validación
  const [validationErrors, setValidationErrors] = useState({});

  /**
 * Valida los campos del producto y retorna un objeto con los errores encontrados.
 * @param {Object} product - Objeto con los datos del producto.
 * @returns {Object} Errores de validación.
 */
  function validateProduct(product) {
    const errors = {};
    if (!product.title.trim()) {
      errors.title = "El nombre del producto es obligatorio.";
    }
    if (!product.description.trim()) {
      errors.description = "La descripción es obligatoria.";
    }
    if (!product.price || isNaN(product.price) || parseFloat(product.price) <= 0) {
      errors.price = "El precio debe ser un número mayor a 0";
    }
    if (!product.category.trim()) {
      errors.category = "La categoría es obligatoria.";
    }
    if (!product.brand.trim()) {
      errors.brand = "La marca es obligatoria.";
    }
    if (!product.rating || isNaN(product.rating) || product.rating < 0 || product.rating > 5) {
      errors.rating = "La calificación debe estar en 0 y 5.";
    }
    return errors;
  }

  /**
   * Maneja el envío del formulario, valida los campos y muestra errores si existen.
   * @param {Event} event 
   */
  function handleSubmit(event) {
    event.preventDefault();
    const errors = validateProduct(product);

    // Si hay errores, se actualiza el estado y se detiene el envío
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Limpiar los errores si no hay nuevos.
    setValidationErrors({});

    const newProduct = {
      title: product.title,
      description: product.description,
      imageURL: product.imageURL,
      price: parseFloat(product.price),
      category: product.category,
      brand: product.brand,
      rating: parseFloat(product.rating)
    };

    // Integración con API
    onProductAdded(newProduct);

    // Si no hay errores, se limpia el formulario
    // clearForm();
  };

  /**
   * Muestra el modal para cargar la URL de la imagen.
   * @param {Event} event 
   */
  function handleLoadImage(event) {
    event.stopPropagation();
    setShowModal(true);
  }

  /**
   * Maneja los cambios en los campos del formulario.
   * @param {Event} event 
   */
  function handleChange(event) {
    const { name, value, type } = event.target;
    setProduct(prev => ({
      ...prev,
      [name]: type === "number" || type === "range" ? Number(value) : value
    }));
    // Limpiar los errores si no hay nuevos.
    setValidationErrors({});
  };

  /**
   * Cancela la edición y limpia el formulario.
   */
  function handleCancel() {
    clearForm();
    navigate("/admin");
  }

  return (
    <>
      {/* Formulario principal */}
      <form onSubmit={handleSubmit} className={styles.formProduct}>
        {/* Sección de imagen */}
        <aside className={styles.imageSection}>
          {/* Vista previa de la imagen o ícono por defecto */}
          {!product.imageURL ?
            <div className={styles.empyImage}>
              <i className='bx bx-image'></i>
            </div> :
            <img src={product.imageURL} alt="Vista previa del producto" />
          }
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLoadImage}
          >
            {product.imageURL ? "Cambiar imagen..." : "Cargar imagen..."}
          </button>
          {product.imageURL && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => setProduct(prev => ({ ...prev, imageURL: "" }))}
            >
              Quitar imagen
            </button>
          )}

        </aside>
        {/* Sección de datos del producto */}
        <section className={styles.productData}>
          {/* Campo: Nombre del producto */}
          <div className={styles.field}>
            <label htmlFor="title">Producto:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={product.title}
              onChange={handleChange}
              className={validationErrors.title ? styles.inputError : ""}
              required
            />
            {/* Mensaje de error para el nombre */}
            {validationErrors.title && (
              <span className={styles.errorMessage}><i className='bx bxs-error-circle'></i> {validationErrors.title}</span>
            )}
          </div>
          {/* Campo: Descripción */}
          <div className={styles.field}>
            <label htmlFor="description">Descripción:</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              className={validationErrors.description ? styles.inputError : ""}
              required
            />
            {/* Mensaje de error para la descripción */}
            {validationErrors.description && (
              <span className={styles.errorMessage}><i className='bx bxs-error-circle'></i> {validationErrors.description}</span>
            )}
          </div>
          {/* Campo: Precio */}
          <div className={styles.field}>
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              className={validationErrors.price ? styles.inputError : ""}
              required
            />
            {/* Mensaje de error para el precio */}
            {validationErrors.price && (
              <span className={styles.errorMessage}><i className='bx bxs-error-circle'></i> {validationErrors.price}</span>
            )}
          </div>
          {/* Campo: Categoría */}
          <div className={styles.field}>
            <label htmlFor="category">Categoría:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              className={validationErrors.category ? styles.inputError : ""}
              required
            />
            {/* Mensaje de error para la categoría */}
            {validationErrors.category && (
              <span className={styles.errorMessage}><i className='bx bxs-error-circle'></i> {validationErrors.category}</span>
            )}
          </div>
          {/* Campo: Marca */}
          <div className={styles.field}>
            <label htmlFor="brand">Marca:</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              className={validationErrors.brand ? styles.inputError : ""}
              required
            />
            {/* Mensaje de error para la marca */}
            {validationErrors.brand && (
              <span className={styles.errorMessage}><i className='bx bxs-error-circle'></i> {validationErrors.brand}</span>
            )}
          </div>
          {/* Campo: Calificación */}
          <div className={styles.field}>
            <label htmlFor="rating">Calificación:</label>
            <input
              type="range"
              id="rating"
              name="rating"
              min="0"
              max="5"
              step="0.5"
              value={product.rating}
              onChange={handleChange}
              className={validationErrors.rating ? styles.inputError : ""}
            />
            {/* Mensaje de error para la calificación */}
            {validationErrors.rating && (
              <span className={styles.errorMessage}><i className='bx bxs-error-circle'></i> {validationErrors.rating}</span>
            )}
          </div>
        </section>
        {/* Botones de acción */}
        <div className={styles.fieldButtons}>
          <button
            className="btn btn-success"
            disabled={Object.keys(validationErrors).length > 0}
          >
            Guardar
          </button>
          <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>

      {/* Modal para ingresar la URL de la imagen */}
      {
        showModal && (
          <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
              <h3>Agregar URL de Imagen</h3>
              <input
                type="text"
                value={tempImageURL}
                onChange={(e) => setTempImageURL(e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              <div className={styles.modalButtons}>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    setProduct(prev => ({ ...prev, imageURL: tempImageURL }));
                    setShowModal(false);
                  }}
                >
                  Agregar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}