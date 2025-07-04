
import { Helmet } from "@dr.pogodin/react-helmet";

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Mi Tienda Online | Términos</title>
      </Helmet>

      <div className="pageContent">
        <h2 className="heading-2">Términos y Condiciones</h2>
        <p className="paragraph">
          Bienvenido a nuestra tienda online. Al acceder y utilizar este sitio web, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso.
        </p>
        <h3 className="heading-3">1. Aceptación de los Términos</h3>
        <p className="paragraph">
          El uso de este sitio web está sujeto a la aceptación de todos los términos, condiciones y avisos contenidos aquí.
        </p>
        <h3 className="heading-3">2. Descripción de los Servicios</h3>
        <p className="paragraph">
          Ofrecemos una variedad de productos/servicios de comercio electrónico. Nos reservamos el derecho a modificar o interrumpir cualquier aspecto del sitio web en cualquier momento.
        </p>
        <h3 className="heading-3">3. Uso Adecuado</h3>
        <p className="paragraph">
          Usted se compromete a utilizar este sitio web sólo para fines legales y de manera que no infrinja los derechos de terceros ni restrinja o inhiba el uso y disfrute del sitio web por parte de terceros.
        </p>
        <h3 className="heading-3">4. Propiedad Intelectual</h3>
        <p className="paragraph">
          Todos los contenidos de este sitio web (textos, gráficos, logos, etc.) son propiedad de Mi Tienda Online o de sus licenciantes y están protegidos por las leyes de propiedad intelectual.
        </p>
        <h3 className="heading-3">5. Limitación de Responsabilidad</h3>
        <p className="paragraph">
          En la medida en que lo permita la ley, Mi Tienda Online no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de usar este sitio web.
        </p>
        <h3 className="heading-3">6. Enlaces a Terceros</h3>
        <p className="paragraph">
          Este sitio web puede contener enlaces a sitios web de terceros. Estos enlaces se proporcionan sólo para su conveniencia. No tenemos control sobre el contenido de esos sitios web y no somos responsables de su contenido o exactitud.
        </p>
        <h3 className="heading-3">7. Cambios a los Términos y Condiciones</h3>
        <p className="paragraph">
          Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Le recomendamos que revise esta página periódicamente para estar al tanto de cualquier cambio.
        </p>
        <h3 className="heading-3">8. Ley Aplicable</h3>
        <p className="paragraph">
          Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de Argentina, y cualquier disputa relacionada con estos términos y condiciones estará sujeta a la jurisdicción exclusiva de los tribunales de Argentina.
        </p>
      </div>
    </>
  );
}