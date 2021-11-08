import "./App.css";
import "./Navbar/Navbar.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Contacto from "./pages/Contacto";
import Especialistas from "./pages/Especialistas";
import Precios from "./pages/Precios";
import IniciarSesion from "./pages/IniciarSesion";
import AcercaDe from "./pages/AcercaDe";
import Navbar from "./Navbar/Navbar";
import RegistroUser from "./pages/RegistroUser";
import RegistroEspecialista from "./pages/RegistroEspecialista";
import PerfilUser from "./pages/PerfilUser";
import SeleccionRegistro from "./pages/SeleccionRegistro";
import PerfilEspecialista from "./pages/PerfilEspecialista";


function App() {
  return (
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
          <Route path="/RegistroUser" component={RegistroUser} />
          <Route path="/RegistroEsp" component={ RegistroEspecialista} />
          <Route path="/PerfilUser" component={ PerfilUser } />
          <Route path="/PerfilEsp" component={ PerfilEspecialista } />
          <Route path="/SelectReg" component={ SeleccionRegistro } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
