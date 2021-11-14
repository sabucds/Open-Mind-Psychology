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
import UserContextProvider from "../context/UserContext";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute";
import ProfileRoute from "./ProtectedRoutes/ProfileRoute";
import VisitorRoute from "./ProtectedRoutes/VisitorRoute";
import CredUpload from "./pages/registro/CredUpload";
import Configuracion from "./pages/configuracion/Configuración";

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
            <VisitorRoute exact path="/iniciar" component={IniciarSesion} />
            <VisitorRoute
              exact
              path="/selectReg/registro"
              component={RegistroUser}
            />
            <PrivateRoute exact path="/perfil" component={ProfileRoute} />
            <VisitorRoute
              exact
              path="/selectReg"
              component={SeleccionRegistro}
            />
            <PrivateRoute
              exact
              path="/selectReg/registro/upload"
              component={CredUpload}
            ></PrivateRoute>
            {/* <Route exact path="/chats" component={Chats} />
            <Route exact path="/citas" component={Citas} />
           <Route exact path="/listaPacientes" component={ListaPacientes} /> */}
          </Switch>
        </Router>
      </div>
    </UserContextProvider>
  );
}

export default App;
