import Header from "../components/header";
import "../styles/Global.css"
import React, {useState} from "react";

export default function Reportes() {
  const today = new Date().toISOString().split("T")[0];
  const [fecha, setFecha] = useState(today);



    return (
    <div className="screen-container">
      <Header></Header>

      <main className="reportes-main">
        <h1>REPORTES</h1>

        <div className="menu-buttons">

          <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="hidden"
          />

          <button
          onClick={() => generarPDF(fecha)}
          className="menu-btn">DESCARGAR PDF</button>

          <button
          onClick={() => generarExcel(fecha)}
          className="menu-btn">DESCARGAR EXCEL</button>
        </div>
      </main>
    </div>
    );
  }


function generarPDF(fecha){
  console.log("TODO PDF")
  console.log(fecha)
}

function generarExcel(fecha){
  console.log("TODO EXCEL")
  console.log(fecha)
}