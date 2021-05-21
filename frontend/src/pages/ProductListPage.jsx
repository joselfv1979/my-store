import { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getProductsAction,
  deleteProductAction,
} from "../actions/productsActions";
import {
  addToList,
  addQuantity,
  subtractQuantity,
} from "../actions/cartActions";
import ProductList from "../components/ProductList";
import ProductSearch from "../components/ProductSearch";
import styles from "../scss/ProductListPage.module.scss";

const ProductListPage = ({ dispatch, products, user }) => {
  useEffect(() => {
    if (localStorage.length === 0) {
      dispatch(getProductsAction(""));
    }
  }, [dispatch]);

  const filterProducts = (parameters) => {
    dispatch(getProductsAction(parameters));
    JSON.stringify(localStorage.setItem("parameters", parameters));
  };

  const deleteProduct = (product) => {
    dispatch(deleteProductAction(product));
  };

  const addToListDispatch = (product) => {
    dispatch(addToList(product));
  };

  const addQuantityDispatch = (product) => {
    dispatch(addQuantity(product));
  };

  const subtractQuantityDispatch = (product) => {
    dispatch(subtractQuantity(product));
  };

  const history = useHistory();

  const showProductDetail = (product) => {
    history.push(`/product/${product.id}`);
  };

  return (
    <div className={styles.container}>
      <ProductSearch filterProducts={filterProducts} />
      <ProductList
        products={products}
        user={user}
        deleteProduct={deleteProduct}
        addToList={addToListDispatch}
        addQuantity={addQuantityDispatch}
        subtractQuantity={subtractQuantityDispatch}
        showProductDetail={showProductDetail}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.productList,
  user: state.user.user,
  status: state.products.status,
});

export default connect(mapStateToProps)(ProductListPage);
