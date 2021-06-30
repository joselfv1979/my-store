import Product from "./Product";
import AdminButtons from "./AdminButtons";
import UserButtons from "./UserButtons";
import styles from "../scss/ProductListPage.module.scss";

const ProductList = ({
  addToList,
  subtractQuantity,
  addQuantity,
  products,
  showEffectDetail,
  user,
  deleteProduct,
  showProductDetail,
}) => {
  const List = () => {
    return products.map((product, i) => (
      <li className={styles.info} key={i}>
        <Product product={product} showProductDetail={showProductDetail} showEffectDetail={showEffectDetail} />

        {user && user.role === "admin" ? (
          <AdminButtons id={product.id} deleteProduct={deleteProduct} />
        ) : (
          <UserButtons
            addToList={addToList}
            addQuantity={addQuantity}
            subtractQuantity={subtractQuantity}
            product={product}
          />
        )}
      </li>
    ));
  };

  return (
    <>
      {products.length ? (
        <div className={styles.list}>
          <ul className={styles.ul}>
            <List />
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
