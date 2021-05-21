import {
  PlusCircleIcon,
  MinusCircleIcon,
  TrashIcon,
} from "../components/Icons";
import styles from "./../scss/CartPage.module.scss";

const Cart = ({ cart, subtractQuantity, addQuantity }) => {
  const ProductData = ({ product }) => {
    return (
      <>
        <img src={`/files/${product.image}`} alt={product.description} />
        <div className={styles.data}>
          <p className={styles.name}>{product.name}</p>
          <p className={styles.text}>Price: {product.price} €</p>
        </div>
        <div className={styles.quantity}>
          <p>Quantity: {product.quantity}</p>
        </div>
      </>
    );
  };

  const PlusButton = ({ product }) => {
    return (
      <button className={styles.plus} onClick={() => addQuantity(product)}>
        <PlusCircleIcon width={"1rem"} />
      </button>
    );
  };

  const MinusButton = ({ product }) => {
    return (
      <button
        className={styles.minus}
        onClick={() => subtractQuantity(product)}
      >
        {product.quantity > 1 ? (
          <MinusCircleIcon width={"1rem"} />
        ) : (
          <TrashIcon width={"1rem"} />
        )}
      </button>
    );
  };

  const CartList = () => {
    return cart.map((product) => (
      <li className={styles.card} key={product.id}>
        <ProductData product={product} />
        <div className={styles.buttons}>
          <PlusButton product={product} />
          <MinusButton product={product} />
        </div>
      </li>
    ));
  };

  return <ul className={styles.list}>{<CartList />}</ul>;
};

export default Cart;
