import React from "react";
import { useRef, useEffect } from "react";
import { bd } from "../../../utils/firebaseConfig";
import { useHistory } from "react-router-dom";

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

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
