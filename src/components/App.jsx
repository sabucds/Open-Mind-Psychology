import "./App.css";
import "./Navbar/Navbar.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "./pages/inicio/Inicio";
import Contacto from "./pages/Contacto";
import Especialistas from "./pages/Especialistas";
import Precios from "./pages/Precios";
import IniciarSesion from "./pages/IniciarSesion";
import AcercaDe from "./pages/AcercaDe";
import Navbar from "./Navbar/Navbar";
import RegistroUser from "./pages/registro/RegistroUser";
import PerfilUser from "./pages/PerfilUser";
import SeleccionRegistro from "./pages/registro/SeleccionRegistro";
import PerfilEspecialista from "./pages/PerfilEspecialista";
import UserContextProvider from "../context/UserContext";

function App() {
  return (
    <UserContextProvider>
      <div className="container">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Inicio} />
            <Route path="/precios" component={Precios} />
            <Route path="/especialistas" component={Especialistas} />
            <Route path="/acerca" component={AcercaDe} />
            <Route path="/contacto" component={Contacto} />
            <Route path="/iniciar" component={IniciarSesion} />
            <Route path="/Registro" component={RegistroUser} />
            <Route path="/PerfilUser" component={PerfilUser} />
            <Route path="/PerfilEsp" component={PerfilEspecialista} />
            <Route path="/SelectReg" component={SeleccionRegistro} />
          </Switch>
        </Router>
      </div>
    </UserContextProvider>
  );
}

export default App;
