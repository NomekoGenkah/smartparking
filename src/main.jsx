import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";

import EstebanPage from "./screens/EstebanPage.jsx";
import FelipePage from "./screens/FelipePage.jsx";
import MartinPage from "./screens/MartinPage.jsx";
import MaximilianoPage from "./screens/MaximilianoPage.jsx";
import PedroPage from "./screens/PedroPage.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Ruta base */}
        <Route path="/" element={<App />} />

        {/* Screens para cada integrante */}
        <Route path="/EstebanPage" element={<EstebanPage />} />
        <Route path="/FelipePage" element={<FelipePage />} />
        <Route path="/MartinPage" element={<MartinPage />} />
        <Route path="/MaximilianoPage" element={<MaximilianoPage />} />
        <Route path="/PedroPage" element={<PedroPage />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
