import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";

import Login from "./screens/Login.jsx";
import Ganancias from "./screens/Ganancias.jsx";
import Reportes from "./screens/Reportes.jsx";
import Ingreso from "./screens/Ingreso.jsx";
import Registro from "./screens/Registro.jsx";
import Menu from "./screens/Menu.jsx";

import { ConfigProvider } from "./context/ConfigContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta base */}
          <Route path="/" element={<App />} />

          {/* Screens para cada integrante */}
          <Route path="/Ingreso" element={<Ingreso />} />
          <Route path="/Reportes" element={<Reportes />} />
          <Route path="/Ganancias" element={<Ganancias />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Registro" element={<Registro />} />

        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
