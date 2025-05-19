import { Link } from "react-router-dom";

export default function Faq() {
  return (
    <div className="pageContent">
      <h2>Preguntas Frecuentes</h2>
      <h3>1. ¿Cómo realizo un pedido?</h3>
      <p>
        Para realizar un pedido, navegue por nuestro sitio web, seleccione los productos que desea comprar y agréguelos a su carrito. Luego, haga clic en el botón "Carrito" y siga las instrucciones para completar su compra.
      </p>
      <h3>2. ¿Cuáles son sus opciones de pago?</h3>
      <p>
        Aceptamos tarjetas de crédito, débito, Mercado Pago, PayPal, etc.
      </p>
      <h3>3. ¿Cuáles son sus opciones de envío?</h3>
      <p>
        Ofrecemos [Lista de métodos de envío, e.g., envío estándar,envío express, etc.]. Los tiempos de envío y los costos varían según el método de envío seleccionado.
      </p>
      <h3>4. ¿Cuál es su política de devoluciones?</h3>
      <p>
        Aceptamos devoluciones de productos sin usar dentro de los [Número] días de la fecha de compra. Consulte nuestra <Link to="/policies">Política de Devoluciones</Link> para obtener más detalles.
      </p>
      <h3>5. ¿Cómo puedo contactarlos?</h3>
      <p>
        Puede contactarnos por correo electrónico a info@mitienda.com o por teléfono al +123 456 789.
      </p>
      <h3>6. ¿Cómo creo una cuenta?</h3>
      <p>
        Puede crear una cuenta haciendo clic en el enlace "Registrarse" en la parte superior de la página y siguiendo las instrucciones.
      </p>
      <h3>7. ¿Olvidé mi contraseña?</h3>
      <p>
        Si olvidó su contraseña, haga clic en el enlace "¿Olvidó su contraseña?" en la página de inicio de sesión y siga las instrucciones para restablecerla.
      </p>
    </div>
  );
}