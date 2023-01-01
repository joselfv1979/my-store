import {
  PlusCircleIcon,
  MinusCircleIcon,
  TrashIcon,
} from "./Icons";
import styles from "./../scss/CartPage.module.scss";

//{ cart, subtractQuantity, addQuantity }
const cart: string[] = [];
const Cart = () => {
 // { product }
  const ProductData = () => {
    return (
      <>
        {/* <img src={`/files/${product.image}`} alt={product.description} /> */}
        <div className={styles.data}>
          <p className={styles.name}>{'name'}</p>
          <p className={styles.text}>Price: {'price'} €</p>
        </div>
        <div className={styles.quantity}>
          <p>Quantity: {'quantity'}</p>
        </div>
      </>
    );
  };

  // { product }
  const PlusButton = () => {
    return (
      <button className={styles.plus} onClick={() => console.log('add')}>
        <PlusCircleIcon width="1rem" />
      </button>
    );
  };

  // { product }
  const MinusButton = () => {
    return (
      <button
        className={styles.minus}
        onClick={() => console.log('substract')}
      >
        {2 > 1 ? (
          <MinusCircleIcon />
        ) : (
          <TrashIcon />
        )}
      </button>
    );
  };

  const CartList = () => {
    return cart.map((product) => (
      <li className={styles.card} key={product}>
        <ProductData />
        <div className={styles.buttons}>
          <PlusButton />
          <MinusButton />
        </div>
      </li>
    ));
  };

  return <ul className={styles.list}>{'cart list'}</ul>;
};

export default Cart;
