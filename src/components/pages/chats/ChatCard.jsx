import styles from "./Chats.module.css";
import { useHistory } from "react-router-dom";

const ChatCard = (props) => {
  const history = useHistory();
  function handleOpenChat() {
    history.push(`/chats/${props.usuario.id}`);
  }

  return (
    <div className={styles.chat} onClick={handleOpenChat}>
      {props.usuario.name}
    </div>
  );
};

export default ChatCard;
