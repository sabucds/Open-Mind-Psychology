import styles from "./ListaPacientes.module.css"
import { useHistory } from "react-router-dom";

const PacienteCard = (props) => {
  const history = useHistory();
  function handleOpenProfile() {
    history.push(`/historial/${props.usuario.id}`);
  }

  return (
    <>
      <div
        className={styles.chat}
        onClick={handleOpenProfile}
      >
        <div className={styles.nameDateCont}>
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
      </div>
      <div className={styles.line2}></div>
    </>
  );
};

export default PacienteCard;