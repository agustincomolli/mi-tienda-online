# 🛒 Mi Tienda Online – Proyecto React

[![React](https://img.shields.io/badge/React-18.x-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-%5E4.0-purple?logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![SweetAlert2](https://img.shields.io/badge/SweetAlert2-11.x-ff69b4?logo=sweetalert)](https://sweetalert2.github.io/)

¡Bienvenido a **Mi Tienda Online**!  
Este proyecto es una tienda online desarrollada con **React** como parte del curso Talento Tech. Permite explorar productos, agregarlos al carrito y navegar por distintas secciones informativas.

---

## 📑 Tabla de Contenidos

- [Características principales](#características-principales)
- [Demo](#demo)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación y uso](#instalación-y-uso)
- [Scripts disponibles](#scripts-disponibles)
- [Dependencias principales](#dependencias-principales)
- [Configuración del Entorno](#configuración-del-entorno)
- [Créditos](#créditos)

---

## ✨ Características principales

- 📦 **Catálogo de productos**: Visualización de productos obtenidos desde una API externa.
- 🛒 **Carrito de compras**: Agrega, elimina y visualiza productos en un carrito persistente durante la sesión.
- 🔒 **Rutas protegidas**: Acceso al carrito solo para usuarios autenticados (simulación).
- 🧩 **Componentes reutilizables**: Layout, productos, carrito, acordeón, paginador, etc.
- 🎨 **Estilos personalizados**: CSS Modules, variables CSS y estilos globales.
- 🚀 **Navegación SPA**: React Router para navegación entre páginas (Inicio, Productos, FAQ, Términos, Políticas, Contacto, Acerca de).
- 💬 **Mensajes amigables**: Uso de SweetAlert2 para notificaciones en formularios.
- 📱 **Responsive**: Diseño adaptable a dispositivos móviles y escritorio.
- 🔍 **Búsqueda y paginación**: Encuentra productos fácilmente.
- 👤 **Autenticación**: Login con email/contraseña y Google (Firebase).
- 🛠️ **Panel de administración**: Agrega, edita y elimina productos (solo admin).

---

## 🌐 Demo

> Próximamente: [https://agustincomolli-mi-tienda-online.netlify.app](https://agustincomolli-mi-tienda-online.netlify.app)

---

## 📁 Estructura del proyecto

```
mi-tienda-online/
│
├── mockup/                # Prototipos HTML y CSS de referencia
├── public/                # Archivos públicos y estáticos
├── src/
│   ├── api/               # Lógica para consumir la API de productos
│   ├── assets/            # Imágenes e íconos
│   ├── components/        # Componentes reutilizables (Cart, Layout, Products, etc.)
│   ├── context/           # Contexto global para el carrito y autenticación
│   ├── pages/             # Páginas principales (Home, About, Contact, etc.)
│   ├── styles/            # Variables y estilos globales
│   ├── App.jsx            # Componente principal de la app
│   └── main.jsx           # Punto de entrada de React
├── package.json
├── vite.config.js
├── .env.example
├── README.md
└── ...
```

---

## ⚡ Instalación y uso

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/tu-usuario/mi-tienda-online.git
   cd mi-tienda-online
   ```

2. **Instala las dependencias:**
   ```sh
   npm install
   ```

3. **Configura las variables de entorno:**
   - Renombra `.env.example` a `.env` y completa tus credenciales de Firebase.

4. **Inicia el servidor de desarrollo:**
   ```sh
   npm run dev
   ```

5. **Abre la aplicación:**
   - Ve a [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 🛠️ Scripts disponibles

- `npm run dev` – Inicia el servidor de desarrollo.
- `npm run build` – Genera la versión de producción.
- `npm run preview` – Previsualiza la versión de producción.
- `npm run lint` – Ejecuta el linter para revisar el código.

---

## 📦 Dependencias principales

- [React](https://react.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)
- [SweetAlert2](https://sweetalert2.github.io/) (notificaciones)
- [Boxicons](https://boxicons.com/) (íconos)
- [Firebase](https://firebase.google.com/) (autenticación)
- [ESLint](https://eslint.org/) (desarrollo)

---

## 🔐 Configuración del Entorno

Para ejecutar el proyecto, necesitas configurar tus variables de entorno de Firebase.

1. Renombra el archivo `.env.example` a `.env` en la raíz del proyecto:
   ```bash
   cp .env.example .env
   ```
2. Completa las variables con tus credenciales de Firebase.

---

## 👨‍💻 Créditos

Proyecto realizado por **Agustín Comolli** para el curso Talento Tech.

---

¡Gracias por visitar este proyecto!  
Si tienes sugerencias o encuentras algún problema, no dudes en abrir un issue o enviar un pull request.