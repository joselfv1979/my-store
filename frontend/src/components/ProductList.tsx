import Product from "./Product";
import AdminButtons from "./AdminButtons";
import UserButtons from "./UserButtons";
import styles from "../scss/ProductListPage.module.scss";

// {
//   addToList,
//   subtractQuantity,
//   addQuantity,
//   products,
//   showEffectDetail,
//   user,
//   deleteProduct,
//   showProductDetail,
// }
const products :string[]= [];
const ProductList = () => {
  const List = () => {
    return products.map((i) => (
      <li className={styles.info} key={i}>
        <Product />

        { "admin" ? (
          <AdminButtons id={'1'}/>
        ) : (
          <UserButtons />
        )}
      </li>
    ));
  };

  return (
    <>
      {products.length ? (
        <div className={styles.list}>
          <ul className={styles.ul}>
            {/* <List /> */}
          </ul>
        </div>
      ) : (
        <div className={styles.notFound}>
          <p>No products found</p>
        </div>
      )}
    </>
  );
};

export default ProductList;
