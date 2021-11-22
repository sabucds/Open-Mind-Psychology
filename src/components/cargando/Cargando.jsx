import styles from "./Cargando.module.css";

const Cargando = () => {
  return (
    <section className={styles.loadingSect}>
      <div class={styles.rotating}></div>
      <div className={styles.cargando}>Cargando...</div>
    </section>
  );
};

export default Cargando;
