import styles from "./About.module.css";

import luis from "../assets/luis.png";
import sabrina from "../assets/sabrina.png";
import matias from "../assets/matias.png"
import silvia from "../assets/silvia.png"

export default function About() {
  return (
    <div className={styles.pageContainer}>
      <section className={styles.about}>
        <h2>Acerca de Nosotros</h2>
        <p>
          Bienvenidos a Mi Tienda Online, tu destino de compras en línea. Nos dedicamos a ofrecerte la mejor selección de
          productos con una experiencia de compra fácil y agradable. Nuestra misión es satisfacer tus necesidades y
          superar tus expectativas en cada compra.
        </p>
        <p>
          Creemos en la calidad, la variedad y el excelente servicio al cliente. Trabajamos con pasión para traerte las
          últimas tendencias y los productos más innovadores del mercado.
        </p>
      </section>

      <section className={styles.history}>
        <h3>Nuestra Historia</h3>
        <p>
          Mi Tienda Online comenzó como un pequeño emprendimiento en 2025. Con el tiempo, gracias a la
          confianza de nuestros clientes y nuestro compromiso con la excelencia, hemos crecido hasta convertirnos en
          una tienda en línea líder en el mercado.
        </p>
        <p>
          A lo largo de los años, hemos ampliado nuestra oferta de productos, mejorado nuestra plataforma y fortalecido
          nuestro equipo. Pero nuestra esencia sigue siendo la misma: ofrecerte una experiencia de compra excepcional.
        </p>
      </section>

      <section className={styles.missionVision}>
        <div>
          <h4>Nuestra Misión</h4>
          <p>
            Ofrecer productos de alta calidad y un servicio al cliente excepcional, creando una experiencia de compra
            en línea que supere las expectativas de nuestros clientes.
          </p>
        </div>
        <div>
          <h4>Nuestra Visión</h4>
          <p>
            Ser la tienda en línea preferida por los clientes, reconocida por nuestra variedad de productos,
            innovación y compromiso con la satisfacción del cliente.
          </p>
        </div>
      </section>

      <section className={styles.team}>
        <h2>Nuestro Equipo</h2>
        <div className={styles.teamMembers}>
          <div className={styles.member}>
            <img src={luis} alt="Nuestro CEO" />
            <h3>Luis Pérez</h3>
            <p>CEO</p>
          </div>
          <div className={styles.member}>
            <img src={sabrina} alt="Nuestro Gerente de Ventas" />
            <h3>Sabrina García</h3>
            <p>Gerente de Ventas</p>
          </div>
          <div className={styles.member}>
            <img src={matias} alt="Nuestro Jefe de Marketing" />
            <h3>Matías Rodríguez</h3>
            <p>Jefe de Marketing</p>
          </div>
          <div className={styles.member}>
            <img src={silvia} alt="Nuestro Desarrollador Web" />
            <h3>Silvia Martínez</h3>
            <p>Desarrolladora Web</p>
          </div>
        </div>
      </section>
    </div>
  );
}