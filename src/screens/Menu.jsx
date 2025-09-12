//import "./Home.css";
import Header from "../components/header";
import "../styles/Global.css"
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <div className="screen-container">
      <Header></Header>

      <main className="home-main">
        <h1>Menú</h1>
        <p className="subtitle">Selecciona la opción:</p>

        <div className="menu-buttons">
          <button onClick={() => navigate("/Registro")} className="menu-btn">Registro Ingreso/Salida</button>
          <button onClick={() => navigate("/Ingreso")}  className="menu-btn">Ingreso</button>
          <button onClick={() => navigate("/Reportes")} className="menu-btn">Reportes</button>
          <button onClick={() => navigate("/Ganancias")} className="menu-btn">Ganancias</button>
          <button onClick={() => navigate("/Login")} className="menu-btn">Login</button>
        </div>
      </main>
    </div>
  );
}