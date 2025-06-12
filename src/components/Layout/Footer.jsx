import { Link } from "react-router-dom";
import styles from "./Footer.module.css"

/**
 * Componente de pie de página.
 * Muestra información de contacto, enlaces útiles y derechos de autor.
 */
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="contact-info">
                <h4>Contacto</h4>
                <p className="paragraph">
                    Email: <a
                        href="mailto:info@mitienda.com"
                        className={styles.footerLink}
                        title="Escríbenos un correo electrónico"
                    >
                        info@mitienda.com
                    </a>
                </p>
                <p className="paragraph">Teléfono: +123 456 789</p>
            </div>
            <div className="useful-links">
                <h4>Enlaces Útiles</h4>
                <ul>
                    {/* Al utilizar  onClick={() => window.scrollTo(0, 0)} en los Link se va a la parte superior de la pantalla */}
                    <li><Link to="/terms" className={styles.footerLink} onClick={() => window.scrollTo(0, 0)}>Términos y Condiciones</Link></li>
                    <li><Link to="/policies" className={styles.footerLink} onClick={() => window.scrollTo(0, 0)}>Política de Privacidad</Link></li>
                    <li><Link to="faq" className={styles.footerLink} onClick={() => window.scrollTo(0, 0)}>Preguntas Frecuentes</Link></li>
                </ul>
            </div>
            <div className={styles.copyright}>
                <p className="paragraph">&copy; 2025 Mi Tienda Online, por Agustín Comolli. Todos los derechos reservados.</p>
                <div className={styles.socialNetworks}>
                    <a href="https://www.facebook.com" target="_blank" title="Facebook">
                        <i className='bx bxl-facebook-circle' ></i>
                    </a>
                    <a href="https://www.twitter.com" target="_blank" title="Twitter">
                        <i className='bx bxl-twitter' ></i>
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" title="Linkedin">
                        <i className='bx bxl-linkedin-square' ></i>
                    </a>
                    <a href="https://www.youtube.com" target="_blank" title="Youtube">
                        <i className='bx bxl-youtube' ></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}