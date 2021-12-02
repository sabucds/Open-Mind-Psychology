import React from "react";
import { useRef, useEffect } from "react";
import { bd } from "../../../utils/firebaseConfig";
import { useHistory } from "react-router-dom";
import styles from "./Agendar.module.css";
export default function PayPal({
  currentUser,
  especialista,
  selectedDate,
  reason,
}) {
  const history = useHistory();
  const paypal = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
        style: {
          shape: "pill",
          color: "silver",
          layout: "vertical",
          label: "paypal",
        },
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cita Individual",
                amount: {
                  currency_code: "USD",
                  value: "50",
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          await bd.collection("citas").add({
            usuario: currentUser.id,
            especialista: especialista.id,
            date: selectedDate,
            reason: reason,
            status: "activo",
          });
          history.push("/perfil");
          alert("¡Se ha agendado la cita exitosamente!");
        },
        onError: (err) => {
          console.log(err);
          alert("Hubo un error al procesar el pago, vuelva a intentarlo.");
        },
      })
      .render(paypal.current);
  }, []);

  const desplegarInfo = (selectedDate) => {
    const optionsTime = {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    };
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let string;

    string =
      selectedDate.toLocaleDateString("en-GB", options) +
      " " +
      selectedDate.toLocaleTimeString("en-GB", optionsTime);
    return (
      <>
        <div className={styles.subtit3}>Fecha y hora: {string}</div>
      </>
    );
  };

  return (
    <section className={styles.main}>
      <div className={styles.pago}>
        <div className={styles.contenedor2}>
          <div className={styles.subtit}>Detalles de la cita</div>
          <div className={styles.contenedor3}>
            <div className={styles.subtit3}>
              Especialista: {especialista.name}
            </div>
            <div className={styles.subtit3}>Duración: 60 min</div>
            <div className={styles.subtit3}>Razón: {reason}</div>
            {desplegarInfo(selectedDate)}
            <div className={styles.subtit3}>Total a pagar: 50$</div>
          </div>
        </div>
        <div className={styles.contenedor}>
          <div className={styles.subtit}>Seleccione su método de pago: </div>
          <div ref={paypal} className={styles.pago2}></div>
        </div>
      </div>
    </section>
  );
}
