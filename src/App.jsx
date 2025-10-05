import { useEffect } from "react";
import { App as CapacitorApp } from "@capacitor/app";
import { useNavigate, useLocation } from "react-router-dom";
import './App.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const backHandler = CapacitorApp.addListener("backButton", () => {
      const current = location.pathname.toLowerCase();

      if(
        ["/ingreso", "/salida", "/reportes", "ajustes"].includes(current)
      ) {
        navigate("/menu");
      }

      else if (current === "/" || current === "/menu"){
        CapacitorApp.exitApp();
      }
    });

    return () => backHandler.remove();
  }, [location, navigate]);


  return null;
}

export default App;