import styles from "../scss/ProductListPage.module.scss";

const Product = ({ location, product, showProductDetail, showEffectDetail }) => {
  
  const handleOnClick = (product) => {
    if(location.pathname === '/')  showProductDetail(product);
  };

  const checkRate = (index) => {
    let star =
      index < product.rating
        ? "checked"
        : index === product.rating
        ? "checked"
        : "";
    return star;
  };

  const stars = [1, 2, 3, 4, 5];

  const StarRating = () => {
    return stars.map((index) => (
      <i
        key={index}
        className={`fas fa-star ` + styles[`${checkRate(index)}`]}
      ></i>
    ));
  };

  return (
    <article className={styles.content} onClick={() => handleOnClick(product)}>
      <div className={styles.image}>
        <img src={`/files/${product.image}`} alt={product.name} />
      </div>
      {showEffectDetail && <h2 className={styles.shadow}>DETAIL</h2>}
      <div className={styles.data}>
        <h3>{product.name}</h3>
        <p>Price: {product.price} €</p>
        <div>
          <StarRating />
        </div>
      </div>
    </article>
  );
};

export default Product;
