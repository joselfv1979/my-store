import ProductCategories from "../../components/productCategories/ProductCategories";
import Benefits from "components/benefits/Benefits";
import styles from "../../assets/scss/HomePage.module.scss";

const HomePage = () => {
  return (
    <div className={styles.contService}>
      <ProductCategories />
      <Benefits />
    </div>
  );
};

export default HomePage;
