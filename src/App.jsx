import React from "react";
import { Link } from "react-router-dom"; // Importa Link para la navegación
import './App.css';

function App() {
  return (
    <div>
      <h1>Pagina principla</h1>

          <Link to="/EstebanPage">Esteban</Link>

          <Link to="/FelipePage">Felipe</Link>

          <Link to="/MartinPage">Martin</Link>

          <Link to="/MaximilianoPage">Maximilaiano</Link>

          <Link to="/PedroPage">Pedro</Link>


    </div>
  );
}

export default App;