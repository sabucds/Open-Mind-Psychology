import "./App.css";
import "./Navbar/Navbar.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "./pages/inicio/Inicio";
import Contacto from "./pages/contacto/Contacto";
import Especialistas from "./pages/especialistas/Especialistas";
import Precios from "./pages/precios/Precios";
import IniciarSesion from "./pages/IniciarSesion/IniciarSesion";
import AcercaDe from "./pages/acercade/AcercaDe";
import Navbar from "./Navbar/Navbar";
import RegistroUser from "./pages/registro/RegistroUser";
import SeleccionRegistro from "./pages/registro/SeleccionRegistro";
import UserContextProvider from "../context/UserContext";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute";
import ProfileRoute from "./ProtectedRoutes/ProfileRoute";

function App() {
  return (
    <UserContextProvider>
      <div className="container">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Inicio} />
            <Route exact path="/precios" component={Precios} />
            <Route exact path="/especialistas" component={Especialistas} />
            <Route exact path="/acerca" component={AcercaDe} />
            <Route exact path="/contacto" component={Contacto} />
            <Route exact path="/iniciar" component={IniciarSesion} />
            <Route exact path="/selectReg/registro" component={RegistroUser} />
            <PrivateRoute path="/perfil" component={ProfileRoute} />
            <Route exact path="/selectReg" component={SeleccionRegistro} />
          </Switch>
        </Router>
      </div>
    </UserContextProvider>
  );
}

export default App;
