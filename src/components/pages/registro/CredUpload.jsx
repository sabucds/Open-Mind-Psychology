import React from "react";
import "./RegistroUser.css";
import { storage } from "../../../utils/firebaseConfig";
import { UserContext } from "../../../context/UserContext";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

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
            "Hubo un error al subir el archivo, por favor, intente de nuevo. Solo subir archivos pdf"
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
      <section className="main-RegistroUser">
        <form>
          {uploading ? (
            <h1>Subiendo archivo...</h1>
          ) : (
            <input
              name="userfile"
              type="file"
              accept="application/pdf"
              onChange={handleUpload}
            ></input>
          )}
        </form>
      </section>
    );
  }
};

export default CredUpload;
