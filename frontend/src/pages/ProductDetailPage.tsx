import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppWaiting } from "../components/AppStatus";
import Product from "../components/Product";
import styles from "../scss/ProductDetailPage.module.scss";

// ProductDetail View
//{ match, location, dispatch, product, loading }
const ProductDetailPage = () => {
  // const id = match.params.id;

  const navigate = useNavigate();

  // useEffect(() => {
  //  dispatch(getProductAction(id));
  // }, [dispatch, id]);

  return (
    <>
      {1 && <AppWaiting />}
      {3 && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h1>Product Detail</h1>
            <div className={styles.container}>
              {/* <Product /> */}
            </div>
            <div className={styles.description}>
              <h3>Product description:</h3>
              <p>
                <span>{'description'}. </span>
                Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Consequuntur a alias quia corporis consequatur
                facilis magni repellat, ab optio maxime pariatur nemo at eveniet
                sed, consectetur molestias eligendi, necessitatibus accusamus.
              </p>
            </div>
            <button onClick={() => navigate("/")}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

// const mapStateToProps = (state) => ({
//   error: state.message.error,
//   product: state.product.product,
//   loading: state.product.loading,
// });

// export default connect(mapStateToProps)(ProductDetailPage);
export default ProductDetailPage;
