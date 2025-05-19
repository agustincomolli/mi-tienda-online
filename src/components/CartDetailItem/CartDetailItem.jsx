import styles from "./CartDetailItem.module.css";

export default function CartDetailItem() {
  return (
    <div>
      <div className="product-image">
        <img src="../assets/images//martin-fierro.webp" alt="Martin Fierro" height="100px"/>
      </div>
      <div className="product-details">
        <div className="product-info">
          <span className="product-title">Martin Fierro</span>
          <span className="product-price">$ 0,00</span>
        </div>
        <div className="product-quantity">
          <button className="product-quantity-button" id="decrease" title="Disminuir"><i className='bx bx-minus'></i></button>
          <span className="product-quantity-value">1</span>
          <button className="product-quantity-button" id="increase" title="Aumentar"><i className='bx bx-plus'></i></button>
        </div>
        <div className="product-total">
          <span className="product-total-price">$ 0,00</span>
        </div>
      </div>
      <button className="product-remove-button" title="Eliminar"><i className='bx bx-trash'></i></button>
    </div>
  );
}