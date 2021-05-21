import styles from "../scss/AppStatus.module.scss";
import spinner from "../puff.svg";

const AppMessage = ({ message, removeMessage }) => {
  return (
    <div className={styles[`${message.type}`]}>
      <span className={styles.content}>{message.message}</span>
      <button className={styles.close} onClick={() => removeMessage()}>
        x
      </button>
    </div>
  );
};

const AppWaiting = () => {
  return (
    <div className="loader">
      {/* <p>...Loading</p> */}
      <img src={spinner} alt="Loading..." />
    </div>
  );
};

export { AppMessage, AppWaiting };
