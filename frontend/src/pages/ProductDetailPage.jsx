import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppWaiting } from "../components/AppStatus";
import Product from "../components/Product";
import { getProductAction } from "../actions/productsActions";
import styles from "../scss/ProductDetailPage.module.scss";

const ProductDetailPage = ({ match, dispatch, product, loading }) => {
  const id = match.params.id;

  const history = useHistory();

  useEffect(() => {
    dispatch(getProductAction(id));
  }, [dispatch, id]);

  return (
    <>
      {loading && <AppWaiting />}
      {product && (
        <div className={styles.modal}>
          <div className={styles.modalBox}>
            <h1>Product Detail</h1>
            <div className={styles.container}>
              <Product product={product} />
            </div>
            <div className={styles.description}>
              <h3>Product description:</h3>
              <p>
                {product.description}. Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Consequuntur a alias quia corporis consequatur
                facilis magni repellat, ab optio maxime pariatur nemo at eveniet
                sed, consectetur molestias eligendi, necessitatibus accusamus.
              </p>
            </div>
            <button onClick={() => history.push("/")}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  error: state.message.error,
  product: state.product.product,
  loading: state.product.loading,
});

export default connect(mapStateToProps)(ProductDetailPage);
