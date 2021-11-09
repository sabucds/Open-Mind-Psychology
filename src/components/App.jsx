import "./App.css";
import "./Navbar/Navbar.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "./pages/inicio/Inicio";
import Contacto from "./pages/Contacto";
import Especialistas from "./pages/Especialistas";
import Precios from "./pages/Precios";
import IniciarSesion from "./pages/IniciarSesion/IniciarSesion";
import AcercaDe from "./pages/AcercaDe";
import Navbar from "./Navbar/Navbar";
import Registro from "./pages/Registro/Registro";

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
          <Route path="/registro" component={Registro} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
