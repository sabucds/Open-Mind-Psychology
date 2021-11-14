import React from "react";
import "./ConfiguracionUser.css"
import { useState, useContext } from "react";
import { UserContext } from '../../../context/UserContext';
import ReactFlagsSelect from 'react-flags-select';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import { bd, auth, providerEmail, providerFacebook, providerGoogle, providerTwitter } from "../../../utils/firebaseConfig";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Configuracion = ()=>{
    const history = useHistory();
    const { createUser, type } = useContext(UserContext);
    const [selected, setSelected] = useState('');
    const { user, setUser } = useContext(UserContext);
    const [shown, setShown] = React.useState(false);
    const [name, setName] = useState("");
    const [lname, setLname] = useState("");
    const [country, setCountry] = useState("");
    const [number, setNumber] = useState("");
    const [info, setInfo] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [picture, setPicture] = useState("");
    const [saving, setSaving] = useState(false);
    const [updating, setUpdating] = useState(false);
  
    const switchShown = () => setShown(!shown);

    const handleSubmit = async (evt) => {
        console.log(country);
        evt.preventDefault();
        setSaving(true);
        try {
            var errorMessage = "Se detectaron cambios inválidos que no se guardaron en:\n";
            var successMessage = "Se guardaron los cambios para los siguientes campos:\n";
            var userDoc = await bd.collection("users").doc(user.id);
            if (name) {
                if (validator.isAlpha(name, 'es-ES') && name.match(/\s/).length===0) {
                    let oldName = user.name.split(" ");
                    const newName = name+" "+oldName[1];
                    await userDoc.update({name: newName});
                    successMessage+="Nombre\n";
                } else {
                    errorMessage+="Nombre\n";
                }
            }
            if (lname) {
                if (validator.isAlpha(lname, 'es-ES', "-")) {
                    let oldName = user.name.split(" ");
                    const newName = oldName[0]+" "+lname;
                    await userDoc.update({name: newName});
                    successMessage+="Apellido\n";
                } else {
                    errorMessage+="Apellido\n";
                }
            }
            if (country) {
                await userDoc.update({country: country});
                successMessage+="País\n";
            }
            if (number) {
                if (isValidPhoneNumber) {
                    await userDoc.update({phone: number});
                    successMessage+="Número\n";
                } else {
                    errorMessage += "Número\n";
                }
            }
            if (info) {
                await userDoc.update({info: info});
                successMessage+="Información sobre mí";
            }

        } catch (err) {
            alert("Hubo un error al guardar: "+err.message);
        }
        setSaving(false);
        if (successMessage!=="Se guardaron los cambios para los siguientes campos:\n") {
            alert(successMessage);
        }
        if (errorMessage!=="Se detectaron cambios inválidos que no se guardaron en:\n") {
            alert(errorMessage);
        }
        setName("");
        setLname("");
        setNumber("");
        setCountry(null);
        setInfo("");
        
    };

    const handleExit = () => {
        history.push("/PerfilUser"); 
        window.location.reload();
    } 

    const handlePassChange = async () => {
        if (newPassword) {
            setUpdating(true);
            var currentUser = auth.currentUser;
            try {
                await currentUser.updatePassword(newPassword);
                alert("Su contraseña fue actualizada exitosamente.");
            } catch (err) {
                if (err.message === "This operation is sensitive and requires recent authentication. Log in again before retrying this request.") {
                    alert("Para cambiar de contraseña necesitará volver a iniciar sesión e intentar nuevamente."); 
                } else if (err.message === "Password should be at least 6 characters" ){
                    alert("ERROR: la contraseña debe tener al menos 6 caracteres.");
                } else {
                    alert("ERROR: "+err.message);
                }
            }
            setUpdating(false);
            setNewPassword("");
        }
    }

    return (
        <section className = "main-RegistroUser">
            <div className = "edit">
                Editar perfil
            </div>

            <div className = "line2"></div>

            <div className = "editables">
                <div className = "titulo-editables">
                    En esta sección puedes actualizar o verificar tus <br /> datos personales.
                </div>
                <div className = "cuadro1">
                    <div className = "cuadro2">
                    <div className = "nombre-edit">
                        <div className = "titles-edit">
                            Nombre
                        </div>
                        <input
                            id="nombre"
                            name="nombre"
                            type="text"
                            className="input-nombre-edit"
                            placeholder="Nombre"
                            onChange={e => setName(e.target.value)}
                            value = {name}
                        />
                    </div>

                    <div className = "apellido-edit">
                        <div className = "titles-edit">
                            Apellido
                        </div>
                        <input
                            id="apellido"
                            name="apellido"
                            type="text"
                            className="input-apellido-edit"
                            placeholder="Apellido"
                            onChange={e => setLname(e.target.value)}
                            value = {lname}
                        />
                    </div>

                    <div className = "numero-edit">
                        <div className = "titles-edit">
                            Número telefónico
                        </div>
                        <PhoneInput 
                            id="numero"
                            name="numero"
                            className="input-numero-edit"
                            onChange={setNumber}
                            value = {number}
                        />
                    </div>

                    <div className = "pais-edit">
                        <div className = "titles-edit">
                            País
                        </div>
                        <ReactFlagsSelect
                          selected={country}
                          onSelect={code => setCountry(code)}
                          className = "pais-select"
                          
                        />
                    </div>

                    <div className = "sobremi-edit">
                        <div className = "titles-edit">
                            Sobre mí
                        </div>
                        <textarea
                            id="sobremi"
                            name="sobremi"
                            placeholder="Presentación"
                            className="input-sobremi-edit"
                            onChange={e => setInfo(e.target.value)}
                            value = {info}
                        ></textarea>
                    </div>

                    <div className = "perfil-edit">
                        <div className = "titles-edit">
                            Foto de perfil
                        </div>
                        <input
                            id="perfil"
                            name="perfil"
                            type="file"
                            accept=".jpg,.png"
                            className="input-foto-edit"
                            onChange={e => setPicture(e.target.value)}
                            // value = {picture}
                        />
                    </div>
                    </div>
                    
                </div>
                <div className = "cuadro3">
                    <button type="button" className="config-button" onClick={handleSubmit} disabled={saving} style={{background: saving ? "#CCC" : "#EE9D6B" }}>
                        Guardar
                    </button>
                    <button type="button" className="config-button" onClick={handleExit} disabled={saving} style={{background: saving ? "#CCC" : "#EE9D6B" }}>
                        Salir
                    </button>
                </div>
                <br />
                <br />

                <div className = "line3"></div>

                <div className  = "titulo-editables">
                    Si deseas cambiar tu contraseña:
                </div>

                <div className = "cuadro1">
                    <div className = "cuadro2">
                    

                    <div className = "new-contra">
                        <div className = "titles-edit">
                            Nueva contraseña
                        </div>

                        <input
                        id="password_input"
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="***********"
                        type={shown ? 'text' : 'password'}
                        className="input-contra-edit"
                        value={newPassword}
                        />
                    </div>

                    </div>
                </div>

                <div className = "cuadro3">
                <button className="password-button" onClick={switchShown}>
                  {shown ? <div className = "ocultar"></div> : <div className = "mostrar"></div>}
                </button>
                <br />
                <button className = "config-button" type="button" onClick={handlePassChange} disabled={updating} style={{background: updating ? "#CCC" : "#EE9D6B"}}>
                    Cambiar contraseña
                </button>
                </div>
                <br />
                <br />
            </div>

        </section>
    );
};

export default Configuracion;