import React from "react";
import { MinusIcon, PlusIcon } from "./Icons";
import styles from "../scss/UserButtons.module.scss";

// { product, subtractQuantity, addToList, addQuantity }
const UserButtons = () => {
  return (
    <div className={styles.user}>
      {3 ? (
        <div className={styles.addRemove}>
          <button
            className={styles.minus}
            onClick={() => console.log('substract')
            }
          >
            <MinusIcon />
          </button>
          <button className={styles.plus} onClick={() => console.log('add')
          }>
            <span className={styles.text}>{'quantity'} ADDED</span>
            <PlusIcon />
          </button>
        </div>
      ) : (
        <button className={styles.add} onClick={() => console.log('addtolist')
        }>
          <span className={styles.text}>ADD TO LIST</span>
          <PlusIcon />
        </button>
      )}
    </div>
  );
};

export default UserButtons;
