import { useNavigate } from "react-router-dom";
import styles from "../../assets/scss/ErrorPage.module.scss";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.error}>
      <h1>404</h1>
      <h2>Not Found</h2>
      <p>The resource requested could not be found on this server!</p>
      <button className={styles.back} onClick={() => navigate("/")}>
        Back Store {">"}{" "}
      </button>
    </div>
  );
};

export default ErrorPage;
