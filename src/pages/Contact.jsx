import Swal from 'sweetalert2';
import styles from "./Contact.module.css"

export default function Contact() {
  function handleSubmit(event) {
    event.preventDefault()
    const message = "<p>Su mensaje ha sido enviado correctamente.</p>"
      + "<p>Nos comunicaremos con usted a la brevedad.</p>"

    Swal.fire({
      title: "Información de contacto",
      html: message,
      icon: "success",
      confirmButtonText: "Continuar",
      footer: "<p>Muchas gracias</p>"
    })
  };

  return (
    <div className="pageContent">
      <h2>Contáctanos</h2>
      <p>
        Si tienes alguna pregunta, comentario o necesitas ayuda, no dudes en ponerte en contacto con nosotros.
        Completa el siguiente formulario y te responderemos lo antes posible.
      </p>

      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <label htmlFor="user-name">Nombre:</label>
        <input type="text" id="user-name" name="user-name" required placeholder="Nombre y Apellido" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required placeholder="alguien@dominio.com" />

        <label htmlFor="message">Mensaje:</label>
        <textarea id="message" name="message" rows="8" required placeholder="Escribe tu mensaje aquí"></textarea>

        <button className="btn btn-primary" type="submit">Enviar Mensaje</button>
      </form>

      <section className={styles.contactInfo}>
        <h3>Información de Contacto</h3>
        <p><strong>Dirección: </strong>Av Siempreviva 742 Springfield</p>
        <p><strong>Teléfono: </strong>+123 456 789</p>
        <p><strong>Email: </strong>info@mitienda.com</p>
        <p>
          <strong>Horario de Atención: </strong>
          Lunes a Viernes, 9am - 6pm
        </p>
      </section>

      <section className={styles.mapContainer}>
        <h3>Nuestra Ubicación</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.797334938792!2d-73.98517748486527!3d40.75889547932137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c64802a1%3A0x1c91217994825988!2sTimes%20Square!5e0!3m2!1ses!2sus!4v1680781036189!5m2!1ses!2sus"
          allowFullScreen={true}
          className={styles.map}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación">
        </iframe>
      </section>
    </div>
  );
}