# Mi Tienda Online – Proyecto React

Este proyecto es una tienda online desarrollada con **React** como parte del curso Talento Tech. Permite explorar productos, agregarlos al carrito y navegar por distintas secciones informativas.

## Características principales

- **Catálogo de productos**: Visualización de productos obtenidos desde una API externa.
- **Carrito de compras**: Agrega, elimina y visualiza productos en un carrito persistente durante la sesión.
- **Cierre automático del carrito**: El carrito se cierra al hacer clic fuera de él.
- **Navegación SPA**: Uso de React Router para navegación entre páginas como Inicio, Productos, Preguntas Frecuentes, Términos, Políticas, Contacto y Acerca de.
- **Rutas protegidas**: Acceso al carrito solo para usuarios autenticados (simulación).
- **Diseño modular**: Componentes reutilizables para layout, productos, carrito, etc.
- **Estilos personalizados**: Uso de CSS Modules, variables CSS y estilos globales.
- **Mensajes amigables**: Uso de SweetAlert2 para notificaciones en formularios.

## Estructura del proyecto

```
mi-tienda-online/
│
├── mockup/                # Prototipos HTML y CSS de referencia
├── public/                # Archivos públicos y estáticos
├── src/
│   ├── api/               # Lógica para consumir la API de productos
│   ├── assets/            # Imágenes e íconos
│   ├── components/        # Componentes reutilizables (Cart, Layout, Products, etc.)
│   ├── context/           # Contexto global para el carrito
│   ├── pages/             # Páginas principales (Home, About, Contact, etc.)
│   ├── styles/            # Variables y estilos globales
│   ├── App.jsx            # Componente principal de la app
│   └── main.jsx           # Punto de entrada de React
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Instalación y uso

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/tu-usuario/mi-tienda-online.git
   cd mi-tienda-online
   ```

2. **Instala las dependencias:**
   ```sh
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```sh
   npm run dev
   ```

4. **Abre la aplicación:**
   - Ve a [http://localhost:5173](http://localhost:5173) en tu navegador.

## Scripts disponibles

- `npm run dev` – Inicia el servidor de desarrollo.
- `npm run build` – Genera la versión de producción.
- `npm run preview` – Previsualiza la versión de producción.
- `npm run lint` – Ejecuta el linter para revisar el código.

## Dependencias principales

- [React](https://react.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)
- [SweetAlert2](https://sweetalert2.github.io/) (para mensajes en Contacto)
- [Boxicons](https://boxicons.com/) (íconos)
- [ESLint](https://eslint.org/) (desarrollo)

## Créditos

Proyecto realizado por **Agustín Comolli** para el curso Talento Tech.

---

¡Gracias por visitar este proyecto! Si tienes sugerencias o encuentras algún problema, no dudes en abrir un issue o enviar un pull request.