import styles from "../scss/ProductListPage.module.scss";

//{ product, showProductDetail, showEffectDetail }

const Product = () => {
  
  const handleOnClick = () => {
    //showProductDetail(product);
    console.log('product');
  };

  const checkRate = () => {
    // let star =
    //   index < product.rating
    //     ? "checked"
    //     : index === product.rating
    //     ? "checked"
    //     : "";
    // return star;
  };

  const stars = [1, 2, 3, 4, 5];

  // const StarRating = () => {
  //   return stars.map((index) => (
  //     <i
  //       key={index}
  //       className={`fas fa-star ` + styles[`${checkRate(index)}`]}
  //     ></i>
  //   ));
  // };

  return (
    <article className={styles.content} onClick={() => console.log('product')}>
      <div className={styles.image}>
        {/* <img src={`/files/${product.image}`} alt={product.name} /> */}
      </div>
      {/* {showEffectDetail && <h2 className={styles.shadow}>DETAIL</h2>} */}
      <div className={styles.data}>
        <h3>{'name'}</h3>
        <p>Price: {'price'} €</p>
        {/* <div>
          <StarRating />
        </div> */}
      </div>
    </article>
  );
};

export default Product;
