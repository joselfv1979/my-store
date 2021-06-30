import styles from '../scss/AppStatus.module.scss';
import spinner from "../puff.svg";

const AppMessage = ({ message, removeMessage }) => {
  return (
    <div className={styles[`${message.type}`]}>
      <p className={styles.message}>{message.message}</p>
      <span className={styles.close} onClick={() => removeMessage()}>
        x
      </span>
    </div>
  );
};

const AppWaiting = () => {
  return (
    <div className={styles.loader}>
      <img src={spinner} alt="Loading..." />
    </div>
  );
};

export { AppMessage, AppWaiting };
