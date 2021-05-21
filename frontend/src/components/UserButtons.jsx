import React from "react";
import { MinusIcon, PlusIcon } from "./Icons";
import styles from "../scss/UserButtons.module.scss";

const UserButtons = ({ product, subtractQuantity, addToList, addQuantity }) => {
  return (
    <div className={styles.user}>
      {product.quantity ? (
        <div className={styles.addRemove}>
          <button
            className={styles.minus}
            onClick={() => subtractQuantity(product)}
          >
            <MinusIcon />
          </button>
          <button className={styles.plus} onClick={() => addQuantity(product)}>
            <span className={styles.text}>{product.quantity} ADDED</span>
            <PlusIcon />
          </button>
        </div>
      ) : (
        <button className={styles.add} onClick={() => addToList(product)}>
          <span className={styles.text}>ADD TO LIST</span>
          <PlusIcon />
        </button>
      )}
    </div>
  );
};

export default UserButtons;
