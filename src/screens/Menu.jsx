//import "./Home.css";
import Header from "../components/header";
import "../styles/Global.css"
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <div className="screen-main">
      <Header></Header>

      <main className="home-main">
        <h1>Menú</h1>
        <p className="subtitle">Selecciona la opción:</p>

        <div className="menu-buttons">
          <button onClick={() => navigate("/registro")} className="menu-btn">Registrar Ingreso</button>
          <button onClick={() => navigate("/salida")} className="menu-btn">Registrar Salida</button>
          <button onClick={() => navigate("/reportes")} className="menu-btn">Reportes</button>
          <button onClick={() => navigate("/ajustes")} className="menu-btn">Ajustes</button>
        </div>
      </main>
    </div>
  );
}