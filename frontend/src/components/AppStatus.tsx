import styles from '../scss/AppStatus.module.scss';
import { Message } from '../types/Message';
import spinner from "./../puff.svg";

type Props = {
  message: string,
 // removeMessage: () => void
}

const AppMessage = ({ message }: Props) => {
  return (
    <div className={styles[`error`]}>
      <p className={styles.message}>{message}</p>
      <span className={styles.close} onClick={() => console.log('close')
      }>
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
