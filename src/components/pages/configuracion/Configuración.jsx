import React from "react";
import "./Configuracion.css"
import { useState, useContext } from "react";
import { UserContext } from '../../../context/UserContext';
import ReactFlagsSelect from 'react-flags-select';
import { Link, useHistory } from 'react-router-dom';

const Configuracion = ()=>{
    const history = useHistory();
    const [selected, setSelected] = useState('');
    const { user, setUser } = useContext(UserContext);
    const [shown, setShown] = React.useState(false);
    const [values, setValues] = useState({
        password: "",
        password2: "",
      });
  
  const switchShown = () => setShown(!shown);
  const onChange = ({ currentTarget }) => setValues(currentTarget.value);
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
                        />
                    </div>

                    <div className = "numero-edit">
                        <div className = "titles-edit">
                            Número telefónico
                        </div>
                        <input
                            id="numero"
                            name="numero"
                            type="tel"
                            className="input-numero-edit"
                        />
                    </div>

                    <div className = "pais-edit">
                        <div className = "titles-edit">
                            País
                        </div>
                        <ReactFlagsSelect
                          selected={selected}
                          onSelect={code => setSelected(code)}
                          className = "pais-select"
                        />
                    </div>

                    <div className = "sobremi-edit">
                        <div className = "titles-edit">
                            Sobre mi
                        </div>
                        <input
                            id="sobremi"
                            name="sobremi"
                            type="text"
                            className="input-sobremi-edit"
                        />
                    </div>
                    </div>
                    
                </div>
                <div className = "cuadro3">
                    <button className = "config-button">
                        Guardar
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
                    <div className = "contra-actual">
                        <div className = "titles-edit">
                            Contaseña actual
                        </div>

                        <input
                        id="password__input"
                        onChange={onChange}
                        placeholder="***********"
                        type={shown ? 'text' : 'password'}
                        value={values.password2}
                        className="input-contra-edit"
                        />

                    </div>


                    <div className = "new-contra">
                        <div className = "titles-edit">
                            Nueva contraseña
                        </div>

                        <input
                        id="password__input2"
                        onChange={onChange}
                        placeholder="***********"
                        type={shown ? 'text' : 'password'}
                        className="input-contra-edit"
                        value={values.password}
                        />
                    </div>

                    </div>
                </div>

                <div className = "cuadro3">
                <button className="password-button" onClick={switchShown}>
                  {shown ? <div className = "ocultar"></div> : <div className = "mostrar"></div>}
                </button>
                <br />
                <button className = "config-button">
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