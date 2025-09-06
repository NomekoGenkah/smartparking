import React, { useState } from "react"; // UseState para cambios D;
export default function EstebanPage() {
  
// Definición de constantes
const cuposTotales = 50;
//para que se pueda modificar y empieza en 0
const [cuposOcupados, setCuposOcupados] = useState(0); 
const cuposDisponibles = cuposTotales - cuposOcupados;

 
const [texto, setTexto] = useState("");

//funcion para actulaiziar el texto
const handleTextChange = (event) => {
setTexto(event.target.value);
};


//funcion boton al aptretarlo solo cambia numero
const manejarCupo = () => {
    if (cuposOcupados < cuposTotales) {
      setCuposOcupados(cuposOcupados + 1); //aumenta
      alert("patente añadida xd");
    }
    else {
      alert("No quedan espacios");
    }
  };


//funcion registrar Salida
const registrarSalida = () => {
alert("ESTE ES EL PROGRAMA NUMERO 1 DE LA TELEVISION HUMORISTICA! EL CHAVOOOO. INTERPRETADO POR EL SUPERCOMEDIANTE PITO");
};


//funcion descargar boleta
const descargarBoleta = () => {
  window.location.href = "https://aka.ms/minecraftClientGameCoreWindows"; 
};

  return (
    <div style={styles.pagina}>
      {/* Titulos */}
      <h1>Ingreso/Salida de Patente</h1>
      <h2>Espacios Disponibles: {cuposDisponibles}</h2>
      <h3>Escriba patente</h3>



      {/* Campo de texto para patente */}
      <div>
        <input
          type="text"
          value={texto}
          onChange={handleTextChange}
          placeholder="AAA-AAA"
          style={{ width: "40%", padding: "0.5rem" }}
        />
      </div>


      {/* boton de añadir patente */}
      <button 
        onClick={manejarCupo} 
        style={{
          backgroundColor: "#10B981", // Verde
          color: "white", 
          padding: "10px 20px", 
          border: "none", 
          borderRadius: "5px", 
          cursor: "pointer",
          fontSize: "16px",
          marginTop: "1rem",
          display: "block", // para que salga abajo del otro
          alignSelf: "center" //para que aparezca al mdeio
        }}>Ingresar Patente</button>



      {/* boton de Registrar Salida, no hace nada pe */}
      <button 
        onClick={registrarSalida} 
        style={{
          backgroundColor: "#2563EB", // azul tecnologico xD
          color: "white", 
          padding: "10px 20px", 
          border: "none", 
          borderRadius: "5px", 
          cursor: "pointer",
          fontSize: "16px",
          marginTop: "1rem",
          display: "block", // para que salga abajo del otro
          alignSelf: "center" //para que aparezca al mdeio
        }}>Registrar Salida</button>


      {/* boton de descargar boleta, no hace nada pe */}
      <button 
        onClick={descargarBoleta} 
        style={{
          backgroundColor: "#10B98B", // azul tecnologico xD
          color: "white", 
          padding: "10px 20px", 
          border: "none", 
          borderRadius: "5px", 
          cursor: "pointer",
          fontSize: "16px",
          marginTop: "1rem",
          display: "block", // para que salga abajo del otro
          alignSelf: "center" //para que aparezca al mdeio
        }}>Descargar Minecraft</button>



    </div>
  );
}


const styles = {
  pagina: { 
    display: "flex",
    flexDirection: "column", // aplien
    alignItems: "center",
    height: "100vh",
    textAlign: "center", 
  }
  }

  /*
  
      return (
      <div style={{ padding: "2rem", color: "darkgreen" }}>
        <h1>Esteban :D</h1>
                <img src="https://64.media.tumblr.com/913219cd8b336cc36c6ece9fd2f433d5/cddf5819b006fe63-8b/s500x750/8c462597751c86faea35105ba54cb540e999fbb8.png" alt="foto" />
      </div>
    );
  
  */