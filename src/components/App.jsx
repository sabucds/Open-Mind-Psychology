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
import RegistroUser from "./pages/registro/RegistroUser";
import SeleccionRegistro from "./pages/registro/SeleccionRegistro";
import UserContextProvider from "../context/UserContext";
import CredUpload from "./pages/registro/CredUpload";
import Error404 from "./pages/error404/Error404";
import "./cargando/Cargando";

import PrivateRoute from "./ProtectedRoutes/PrivateRoute";
import ProfileRoute from "./ProtectedRoutes/ProfileRoute";
import VisitorRoute from "./ProtectedRoutes/VisitorRoute";
import ConfigRoute from "./ProtectedRoutes/ConfigRoute";
import ClientRoute from "./ProtectedRoutes/ClientRoute";
import NoAdminRoute from "./ProtectedRoutes/NoAdminRoute";
import DetallesEspecialista from "./tarjetaEspecialista/DetallesEspecialista";
import Agendar from "./pages/agendar/Agendar";
import Chats from "./pages/chats/Chats";
import Chat from "./pages/chats/Chat";
import Citas from "./pages/citas/Citas"

function App() {
  return (
    <UserContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <NoAdminRoute exact path="/" component={Inicio} />
            <NoAdminRoute exact path="/precios" component={Precios} />
            <NoAdminRoute
              exact
              path="/especialistas"
              component={Especialistas}
            />
            <NoAdminRoute exact path="/acerca" component={AcercaDe} />
            <NoAdminRoute exact path="/contacto" component={Contacto} />
            <VisitorRoute exact path="/iniciar" component={IniciarSesion} />
            <VisitorRoute
              exact
              path="/selectReg/registro"
              component={RegistroUser}
            />

            <VisitorRoute
              exact
              path="/selectReg"
              component={SeleccionRegistro}
            />
            <PrivateRoute exact path="/perfil" component={ProfileRoute} />
            <NoAdminRoute
              exact
              path="/selectReg/registro/upload"
              component={CredUpload}
            />
            <ClientRoute exact path="/config" component={ConfigRoute} />
            <Route
              exact
              path="/especialistas/:characterId"
              component={DetallesEspecialista}
            />
            <Route exact path={"/agendar/:characterId"} component={Agendar} />

            <Route exact path="/chats" component={Chats} />
            <Route exact path="/chats/:userId" component={Chat} />
            <Route exact path="/citas" component={Citas} />
            <Route path="*" component={Error404} />
          </Switch>
        </Router>
      </div>
    </UserContextProvider>
  );
}

export default App;
