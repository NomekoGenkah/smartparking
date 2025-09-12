//import "./Home.css";
import "../styles/Global.css"

export default function Home() {
  return (
    <div className="screen-container">
      <header className="screen-header">
        <img 
          src="/logo.png" 
          alt="SmartParking Logo" 
          className="logo"
        />
      </header>

      <main className="home-main">
        <h1>Menú</h1>
        <p className="subtitle">Selecciona la opción:</p>

        <div className="menu-buttons">
          <button className="menu-btn">Registro Ingreso/Salida</button>
          <button className="menu-btn">Reportes</button>
          <button className="menu-btn">Panel de Control</button>
          <button className="menu-btn">Contacto Soporte</button>
          <button className="menu-btn">Ajustes</button>
        </div>
      </main>
    </div>
  );
}
