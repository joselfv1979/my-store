import ProductCard from "../productCard/ProductCard";
import styles from "../../assets/scss/ProductListPage.module.scss";
import { useAppSelector } from "../../hooks/redux-hooks";
import { storedProductList } from "../../store/product/productSlice";

const ProductList = () => {
  const products = useAppSelector(storedProductList);
  const hasProducts = () => products && products.length > 0;

  return (
    <div className="container-fluid px-4">
      <h1 className="text-white text-center mb-4">Products</h1>
      <div className="row">
        {hasProducts() ? (
          products.map((product) => (
            <div key={product.id} className="col-md-4 mb-4 w-25 px-1">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p className={styles.emptyText}>no products</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
