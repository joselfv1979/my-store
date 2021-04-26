import { useEffect } from "react";
import { connect } from "react-redux";
import { getProductsAction, deleteProductAction } from "../actions/productsActions";
import { addToList, addQuantity, subtractQuantity } from "../actions/cartActions";
import ProductList from "../components/ProductList";
import ProductSearch from "../components/ProductSearch";
import "../css/ProductListPage.css";

const ProductListPage = ({
  dispatch,
  loading,
  products,
  user
}) => {

  useEffect(() => {
    let params = localStorage.getItem('parameters');

    // console.log('products',JSON.parse(localStorage.getItem('state')).products.productList);

    // params ? dispatch(getProductsAction(params)) 
    // : dispatch(getProductsAction());
  }, [dispatch]);

  const filterProducts = (parameters) => {
    dispatch(getProductsAction(parameters));
    JSON.stringify(localStorage.setItem('parameters',parameters));
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

  return (
    <div className="product-container">
      <ProductSearch filterProducts={filterProducts} />

      <section>
        <ProductList
          products={products}
          user={user}
          deleteProduct={deleteProduct}
          addToList={addToListDispatch}
          addQuantity={addQuantityDispatch}
          subtractQuantity={subtractQuantityDispatch}
        />
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.products.loading,
  products: state.products.productList,
  user: state.user.user,
  // cart: state.cart.cartList
});

export default connect(mapStateToProps)(ProductListPage);
