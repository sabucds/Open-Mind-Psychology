import React from "react";
import "./CredUpload.css";
import { storage } from "../../../utils/firebaseConfig";
import { UserContext } from "../../../context/UserContext";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Cargando from "../../cargando/Cargando";

const CredUpload = () => {
  const { user, loading } = useContext(UserContext);
  const [uploading, setUploading] = useState(false);
  const history = useHistory();
  if (loading) {
    return <h1>Cargando...</h1>;
  } else {
    const handleUpload = (e) => {
      e.preventDefault();

      // Esto es lo que agarra al archivo perse
      const file = e.target.files[0];
      const ref = storage.ref("credentials/" + user.id);

      const upload = ref.put(file);
      setUploading(true);
      upload.on(
        "state_changed",
        function progress(snapshot) {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(user.id);
          console.log("Archivo " + progress + "% listo");
        },
        function error(error) {
          console.error(error);
          alert(
            "Hubo un error al subir el archivo, por favor, intente de nuevo. Sólo suba archivos pdf."
          );
        },
        function complete() {
          console.info("Carga finalizada");
          alert("Carga Finalizada");
          history.push("/perfil");
        }
      );
    };

    return (
      <>
        {!loading ? (
          !!user ? (
            user.role === "especialista" && user.status === "standby" ? (
              <section className="main-FileUp">
                <div className="title-updiv">
                  <h3 className="title-up">
                    ¡Ya casi estas listo!
                    <br />
                    Solo nos falta obtener tus credenciales (.pdf)
                  </h3>
                </div>
                <form className="form-up">
                  {uploading ? (
                    <h1 className="title-up">Subiendo archivo...</h1>
                  ) : (
                    <div
                      className="file-wrapper"
                      data-text="Selecciona el archivo a escoger:"
                    >
                      <input
                        name="userfile"
                        type="file"
                        accept="application/pdf"
                        onChange={handleUpload}
                      ></input>
                    </div>
                  )}
                </form>
                <div className="img-form"></div>
              </section>
            ) : (
              history.push("/perfil")
            )
          ) : (
            history.push("/iniciar")
          )
        ) : (
          <Cargando />
        )}
      </>
    );
  }
};

export default CredUpload;
