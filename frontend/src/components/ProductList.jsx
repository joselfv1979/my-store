import Product from "./Product";
import AdminButtons from "./AdminButtons";
import UserButtons from "./UserButtons";

const ProductList = ({
  addToList,
  subtractQuantity,
  addQuantity,
  products,
  user,
  deleteProduct,
}) => {
  const { role } = user;

  const list = () => {
    return products.map((product) => (
      <li className="info" key={product.id}>
        <Product product={product} />

        {role === "admin" ? (
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
    <div className="product-list">
      <ul>{products.length ? list() : <p>No products found</p>}</ul>
    </div>
  );
};

export default ProductList;
