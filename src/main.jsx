import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { App as CapacitorApp } from "@capacitor/app";

import Login from "./screens/Login.jsx";
import Ganancias from "./screens/Ganancias.jsx";
import Reportes from "./screens/Reportes.jsx";
import Ingreso from "./screens/Ingreso.jsx";
import Registro from "./screens/Registro.jsx";
import Menu from "./screens/Menu.jsx";
import Ajustes from "./screens/Ajustes.jsx";
import SalidaVehiculos from "./screens/SalidaVehiculos.jsx";

import { ConfigProvider } from "./context/ConfigContext.jsx";

// 🔹 Este componente maneja el botón "Atrás" globalmente
function BackButtonHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = CapacitorApp.addListener("backButton", () => {
      const current = location.pathname.toLowerCase();

      // Subpantallas → volver al menú
      if (
        ["/reportes", "/ingreso", "/ganancias", "/registro", "/ajustes", "/salida"].includes(
          current
        )
      ) {
        navigate("/menu");
      }
      // En menú o raíz → salir de la app
      else if (current === "/" || current === "/menu") {
        CapacitorApp.exitApp();
      }
    });

    return () => handler.remove();
  }, [location, navigate]);

  return null; // no renderiza nada
}

function AppRoutes() {
  return (
    <>
      <BackButtonHandler />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/ingreso" element={<Ingreso />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/ganancias" element={<Ganancias />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/ajustes" element={<Ajustes />} />
        <Route path="/salida" element={<SalidaVehiculos />} />
      </Routes>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
