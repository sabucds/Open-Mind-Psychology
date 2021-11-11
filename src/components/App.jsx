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
import PerfilUser from "./pages/perfilUser/PerfilUser";
import SeleccionRegistro from "./pages/registro/SeleccionRegistro";
import PerfilEspecialista from "./pages/perfilEspecialista/PerfilEspecialista";
import ListaPacientes from "./pages/listaPacientes/ListaPacientes";
import Chats from "./pages/chats/Chats";
import Citas from "./pages/citas/Citas";
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
            <Route path="/registro" component={RegistroUser} />
            <Route path="/perfilUser" component={PerfilUser} />
            <Route path="/perfilEsp" component={PerfilEspecialista} />
            <Route path="/selectReg" component={SeleccionRegistro} />
            <Route path="/chats" component={Chats} />
            <Route path="/citas" component={Citas} />
            <Route path="/listaPacientes" component={ListaPacientes} />
          </Switch>
        </Router>
      </div>
    </UserContextProvider>
  );
}

export default App;
