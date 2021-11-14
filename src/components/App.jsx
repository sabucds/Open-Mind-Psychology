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
import ListaPacientes from "./pages/listaPacientes/ListaPacientes";
import Chats from "./pages/chats/Chats";
import Citas from "./pages/citas/Citas";
import UserContextProvider from "../context/UserContext";
import Configuracion from "./pages/configuracion/Configuración";
import Admin from "./pages/admin/Admin";
import Error404 from "./pages/error404/Error404";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute";
import ProfileRoute from "./ProtectedRoutes/ProfileRoute";
import VisitorRoute from "./ProtectedRoutes/VisitorRoute";
import CredUpload from "./pages/registro/CredUpload";

function App() {
  return (
    <UserContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route path="/admin" component={Admin} />

            <Route exact path="/">
              <Navbar />
              <Inicio />
            </Route>
            <Route exact path="/precios">
              <Navbar />
              <Precios />
            </Route>
            <Route exact path="/especialistas">
              <Navbar />
              <Especialistas />
            </Route>
            <Route exact path="/acerca">
              <Navbar />
              <AcercaDe />
            </Route>
            <Route exact path="/contacto">
              <Navbar />
              <Contacto />
            </Route>
            <Route exact path="/iniciar">
              <Navbar />
              <IniciarSesion />
            </Route>
            <Route exact path="/registro">
              <Navbar />
              <RegistroUser />
            </Route>
            <Route exact path="/perfilUser">
              <Navbar />
              <perfilUser />
            </Route>
            <Route exact path="/perfilEspecialista">
              <Navbar />
              <perfilEspecialista />
            </Route>
            <Route exact path="/selectReg">
              <Navbar />
              <SeleccionRegistro />
            </Route>
            <Route exact path="/config">
              <Navbar />
              <Configuracion />
            </Route>
            <Route path="*" component={Error404} />
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
            <Route exact path="/chats" component={Chats} />
            <Route exact path="/citas" component={Citas} />
            <Route exact path="/listaPacientes" component={ListaPacientes} />
          </Switch>
        </Router>
      </div>
    </UserContextProvider>
  );
}

export default App;
