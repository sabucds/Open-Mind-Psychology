import React from "react";
import { bd } from "../../../utils/firebaseConfig";
import { useState } from "react";
import "./Contacto.css";

const Contacto = () => {
  const [contactNombre, setContactNombre] = useState("");
  const [contactApellido, setContactApellido] = useState("");
  const [contactCorreo, setContactCorreo] = useState("");
  const [contactMensaje, setContactMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  function validContactInputs(name, lname, email, msg){
    return !(!name || !lname || !email || !msg || email.match(/@/g).length!==1 || !email.includes(".") || !(/\d/.test(email.charAt(0)) || /[a-zA-Z]/.test(email.charAt(0)))) 
    //Si cualquiera de las condiciones de adentro del paréntesis exterior se cumple, alguno de los campos es inválidos. Por tanto, para saber si lo introducido es válido, se retorna la negación del resultado de las validaciones de invalidez.
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if(validContactInputs(contactNombre, contactApellido, contactCorreo, contactMensaje)){
      bd.collection("contacts").add({
        name: contactNombre+" "+contactApellido,
        email: contactCorreo,
        message: contactMensaje,
      })
      .then(() => {
        setLoading(false);
        alert("¡Mensaje el mensaje fue enviado con éxito!\nGracias por contactarnos.");
      })
      .catch(()=>{
        setLoading(false);
        alert("El mensaje no pudo ser enviado.");
      });    
      
      setContactNombre("");
      setContactApellido("");
      setContactCorreo("");
      setContactMensaje("");

    }else{
      setLoading(false);
      alert("El mensaje no pudo ser enviado.");
    }
    
  }

  return <section className="contact">
    <div className="titulo">Contáctanos</div>
    
    <form className="contactForm" onSubmit={handleSubmit}>
      
      <label htmlFor="contactName">Nombre</label>
      <br />
      <input 
        type="text" 
        name="contactName" 
        className="inputsForm"
        placeholder="Nombre"
        value={contactNombre}
        onChange={e => setContactNombre(e.target.value)}
        />
      <br />

      <label htmlFor="contactLastName">Apellido</label>
      <br />
      <input 
        type="text" 
        name="contactLastName" 
        className="inputsForm"
        placeholder="Apellido"
        value={contactApellido}
        onChange={e => setContactApellido(e.target.value)}
        />
      <br />

      <label htmlFor="contactEmail">Correo electrónico</label>
      <br />
      <input 
        type="email" 
        name="contactEmail" 
        className="inputsForm"
        placeholder="ejemplo@correo.com"
        value={contactCorreo}
        onChange={e => setContactCorreo(e.target.value)}
      />
      <br />

      <label htmlFor="contactMessage">Mensaje</label>
      <br />
      <textarea 
        name="contactMessage" 
        id="contactMessage" 
        placeholder="Escribe tu mensaje aquí"
        value={contactMensaje}
        onChange={e => setContactMensaje(e.target.value)}
        ></textarea>
      <br />

      <button type="submit" disabled={loading} style={{background: loading ? "#CCC" : "#EE9D6B" }} className="button-format">{loading ? "Enviando..." : "Enviar"}</button>
    </form>
  </section>;
};

export default Contacto;
