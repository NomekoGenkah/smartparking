import React from "react";
import { Link } from "react-router-dom"; // Importa Link para la navegación
import './App.css';

function App() {
  return (

    <div>
      <h1>Pagina principla</h1>

          <Link to="/Ingreso"> Esteban </Link>

          <Link to="/Reportes"> Felipe </Link>

          <Link to="/Ganancias"> Martin </Link>

          <Link to="/Login"> Maximiliano </Link>

          <Link to="/Menu"> Menu </Link>

          <Link to="/Registro"> Registro </Link>

          <Link to="/Ajustes"> Ajustes </Link>

    </div>


  );
}

export default App;