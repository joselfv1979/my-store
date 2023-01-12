import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getProductsAction,
  deleteProductAction,
} from "../actions/productActions";
import {
  addToList,
  addQuantity,
  subtractQuantity,
} from "../actions/cartActions";
import ProductList from "../components/ProductList";
import SearchForm from "../components/SearchForm";
import styles from "../scss/ProductListPage.module.scss";
import Container from 'react-bootstrap/Container';

// { dispatch, products, user, cart }
const ProductListPage = () => {
//   useEffect(() => {
//     if (localStorage.length === 0) {
//       dispatch(getProductsAction(""));
//     }
//     user.role === "admin"
//       ? setShowEffectDetail(false)
//       : setShowEffectDetail(true);
//   }, [dispatch, user.role]);

//   const [showEffectDetail, setShowEffectDetail] = useState(true);

//   const getCartProducts = () => {
//     for (let i = 0; i < products.length; i++) {
//       for (let j = 0; j < cart.length; j++) {
//         if (products[i].id === cart[j].id) {
//           products[i].quantity = cart[j].quantity;
//         }
//       }
//     }
//   };
//   getCartProducts();

//   const filterProducts = (parameters) => {
//     dispatch(getProductsAction(parameters));
//     JSON.stringify(localStorage.setItem("parameters", parameters));
//   };

//   const deleteProduct = (product) => {
//     dispatch(deleteProductAction(product));
//   };

//   const addToListDispatch = (product) => {
//     dispatch(addToList(product));
//   };

//   const addQuantityDispatch = (product) => {
//     dispatch(addQuantity(product));
//   };

//   const subtractQuantityDispatch = (product) => {
//     dispatch(subtractQuantity(product));
//   };

  const navigate = useNavigate();

  // const showProductDetail = (product) => {
  //   navigate(`/product/${product.id}`);
  // };

  return (
    <Container fluid>
      {/* <SearchForm
      filterProducts={filterProducts} user={user}
        /> */}
      <ProductList
        // products={products}
        // showEffectDetail={showEffectDetail}
        // user={user}
        // deleteProduct={deleteProduct}
        // addToList={addToListDispatch}
        // addQuantity={addQuantityDispatch}
        // subtractQuantity={subtractQuantityDispatch}
        // showProductDetail={showProductDetail}
      />
    </Container>
  );
};

// const mapStateToProps = (state) => ({
//   products: state.product.productList,
//   user: state.user.user,
//   cart: state.cart.cartList,
// });

// export default connect(mapStateToProps)(ProductListPage);
export default ProductListPage;