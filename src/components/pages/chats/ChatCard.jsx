import styles from "./Chats.module.css";
import { useHistory } from "react-router-dom";

const ChatCard = (props) => {
  const history = useHistory();
  function handleOpenChat() {
    history.push(`/chats/${props.usuario.id}`);
  }

  return (
    <>
      <div className={styles.chat} onClick={handleOpenChat}>
        {Image ? (
          <img
            src={props.usuario.img}
            alt="Avatar"
            className={styles.profilePhoto}
            width={45}
            height={45}
          />
        ) : null}
        <div className={styles.namep}>{props.usuario.name}</div>
      </div>
      <div className={styles.line2}></div>
    </>
  );
};

export default ChatCard;
