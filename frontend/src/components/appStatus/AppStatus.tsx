import styles from '../../assets/scss/AppStatus.module.scss';
import { Message } from '../../types/Message';
import spinner from "../../assets/img/puff.svg";
import Alert from "react-bootstrap/Alert";

type Props = {
  note: Message,
  cancelMessage?: () => void
}

const AppMessage = ({ note, cancelMessage }: Props) => {

  const removeMessage = () => {
    if(cancelMessage) cancelMessage();
  }

  return (
    <Alert variant={note.type} style={{width: "60%", textAlign: 'center'}} onClose={removeMessage} dismissible>
          {note.text}
    </Alert>
  )
}

const AppWaiting = () => {
  return (
    <div id="loader" className={styles.loader}>
      <img src={spinner} alt="Loading..." />
    </div>
  );
};

export { AppWaiting, AppMessage };
