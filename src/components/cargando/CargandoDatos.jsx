import styles from "./Cargando.module.css";

const CargandoDatos = () => {
  return (
    <section className={styles.loadingSect}>
      <div class={styles.rotating}></div>
      <div className={styles.cargando}>Actualizando datos...</div>
    </section>
  );
};

export default CargandoDatos;
