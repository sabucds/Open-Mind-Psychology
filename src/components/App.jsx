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
import Citas from "./pages/citas/Citas";

import PrivateRoute from "./ProtectedRoutes/PrivateRoute";
import ProfileRoute from "./ProtectedRoutes/ProfileRoute";
import VisitorRoute from "./ProtectedRoutes/VisitorRoute";
import ConfigRoute from "./ProtectedRoutes/ConfigRoute";
import ClientRoute from "./ProtectedRoutes/ClientRoute";
import NoAdminRoute from "./ProtectedRoutes/NoAdminRoute";
import UserRoute from "./ProtectedRoutes/UserRoute";
import EspRoute from "./ProtectedRoutes/EspRoute";

import DetallesEspecialista from "./tarjetaEspecialista/DetallesEspecialista";
import Agendar from "./pages/agendar/Agendar";
import Chats from "./pages/chats/Chats";
import Chat from "./pages/chats/Chat";
import ListaPacientes from "./pages/listaPacientes/ListaPacientes";
import HistorialPaciente from "./pages/listaPacientes/HistorialPaciente";

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
            <NoAdminRoute
              exact
              path="/especialistas/:characterId"
              component={DetallesEspecialista}
            />
            <UserRoute
              exact
              path={"/agendar/:characterId"}
              component={Agendar}
            />

            <ClientRoute exact path="/chats" component={Chats} />
            <ClientRoute exact path="/chats/:userId" component={Chat} />
            <ClientRoute exact path="/citas" component={Citas} />
            <Route exact path="/listaPacientes" component={ListaPacientes} />
            <EspRoute
              exact
              path="/historial/:userId"
              component={HistorialPaciente}
            />
            <Route path="*" component={Error404} />
          </Switch>
        </Router>
      </div>
    </UserContextProvider>
  );
}

export default App;
