import React from "react";
import SingleProduct from "./Product";
import AdminButtons from "./AdminButtons";
import UserButtons from "./UserButtons";
import styles from "../scss/ProductListPage.module.scss";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { useEffect } from "react";
import { fetchProducts } from "../store/product/productActions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

const ProductList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);
  console.log("products: ", products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Row xs={1} md={2} className="g-4">
      {products.map((product) => (
        <Col md="auto" key={product.id}>
          <SingleProduct product={product} />
          {/* {"admin" ? <AdminButtons id={"1"} /> : <UserButtons />} */}
        </Col>
      ))}
    </Row>
  );
};

// return (
//   <>
//     {products.length ? (
//       <div className={styles.list}>
//         <ul className={styles.ul}>
//           <List />
//         </ul>
//       </div>
//     ) : (
//       <div className={styles.notFound}>
//         <p>No products found</p>
//       </div>
//     )}
//   </>
// );

export default ProductList;
