import FormProduct from "../components/FormProduct/FormProduct";
// import styles from "./Admin.module.css";


export default function Admin() {
  return (
    <div className="pageContent">
      <article>
        <h2 className="heading-2">Agregar producto</h2>
        <FormProduct />
      </article>
    </div>
  );
}