import { useState } from "react";
import styles from "./FormProduct.module.css"

export default function FormProduct() {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    category: "",
    brand: "",
    rating: ""
  });

  return (
    <form action="" className={styles.FormProduct}>

    </form>
  );
}