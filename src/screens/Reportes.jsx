import Header from "../components/header";
import "../styles/Global.css"

export default function Reportes() {
    return (
    <div className="screen-container">
      <Header></Header>

      <main className="reportes-main">
        <h1>REPORTES</h1>
        <p className="subtitle">Selecciona la opción:</p>

        <div className="menu-buttons">
          <button className="menu-btn">SELECCIONE FECHA</button>
          <button className="menu-btn">DESCARGAR PDF</button>
          <button className="menu-btn">TOTAL DE HOY</button>
        </div>
      </main>
    </div>
    );
  }