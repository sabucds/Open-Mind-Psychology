import React from "react";
import "./PerfilUser.css";

const PerfilUser = () => {
  return (
    <section className="main-RegistroUser">
      <div className = "encabezado">
        <div>
            <img src="https://i.insider.com/5f68c25457b7da001ee12c85?width=1100&format=jpeg&auto=webp" className = "imagen-user" />
        </div>
        <div className = "nombre-user">
            Harold Pain
        </div>
      </div>
      <div className = "relleno">
        <div className = "Datos-user">
          <div className = "correo-user">
              <div className = "titles">
                Correo electrónico
              </div>
              <div>
                nosequeponer@gmail.com
              </div>
          </div>
          <div className = "Numero-user">
              <div className = "titles">
                Número telefónico
              </div>
              <div>
                +58 4148724455
              </div>
          </div>
          <div className = "pais-user">
              <div className = "titles">
                País
              </div>
              <div>
                Venezuela
              </div>
          </div>
        </div>
        <div className ="about-user">
          <div className = "titles">
            Sobre mi
          </div>
          <div className = "relleno">
              hola me llamo Harold Pain y tengo un lindo perro.
          </div>
          
        </div>

      </div>
    </section>
  );
};

export default PerfilUser;
