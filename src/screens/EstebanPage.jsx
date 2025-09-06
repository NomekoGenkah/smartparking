import React, { useState } from "react"; // UseState para cambios D;

import { useEffect } from 'react'; //para el reloj

export default function EstebanPage() {
  
//VARIABLES
const cuposTotales = 50;
//para que se pueda modificar y empieza en 0
const [cuposOcupados, setCuposOcupados] = useState(0); 
const cuposDisponibles = cuposTotales - cuposOcupados;

//para escribir el texto 
const [texto, setTexto] = useState("");

//fecha y hora
const [currentTime, setCurrentTime] = useState(new Date()); 
const formattedTime = currentTime.toLocaleTimeString();
const formattedDate = currentTime.toLocaleDateString();

////////////////////////////////////////


//FUNCIONES



//funcion para reloj
useEffect(() => {
const interval = setInterval(() => {
  setCurrentTime(new Date());
 }, 1000);

return () => clearInterval(interval); // Limpiar intervalo al desmontar
}, []);




//funcion para actulaiziar el texto
const handleTextChange = (event) => {
setTexto(event.target.value);


};


//funcion boton al aptretarlo solo cambia numero
const manejarCupo = () => {
    if (cuposOcupados < cuposTotales) { //si quedan cupos hace la verificacion
      
       // Eliminar espacios y guiones Y pasar a mayus
      let textoFormatted = texto.toUpperCase();
      textoFormatted = textoFormatted.replace(/[\s-]/g, ''); 
      
      //verifica si la patente solo puede tener estos caracteres, (lei que eran estos no se que tan real, pero poner los verdaderos en caso de que no sean xd)
      const carateresValidos = /[^BCDFGHJKLMPRSTVWXYZ0123456789]/;
      const NoesValido = carateresValidos.test(textoFormatted); // true si hay caracteres no permitidos



      //check si el campo no esta vacio, 
      if (textoFormatted != "" && textoFormatted.length == 6 && NoesValido == false) { 
      

        //esto si es que cumple todos los criterios
        alert("patente (" + textoFormatted + ") ingresada a las " + formattedTime);
        setTexto(''); //lo borra de el campo, deja el texto vacio
        setCuposOcupados(cuposOcupados + 1); //aumenta


      }
      else {
        alert("campo invalido");
      }
    }
    else {
      alert("No quedan espacios");
    }
  };


//funcion registrar Salida
const registrarSalida = () => {
//AQUI DEBERIA ESTAR LA FUNCION CORRECTA
alert("ESTE ES EL PROGRAMA NUMERO 1 DE LA TELEVISION HUMORISTICA! EL CHAVOOOO. INTERPRETADO POR EL SUPERCOMEDIANTE PITO");
};


//funcion descargar boleta
const descargarBoleta = () => {
  window.location.href = "https://aka.ms/minecraftClientGameCoreWindows"; 
};


////////////////////////////////////////


//RETURN DE HTML

  return (
    <div style={styles.pagina}>
      {/* Titulos */}
      <h1>Ingreso/Salida de Patente</h1>
      <h2>Fecha: {formattedDate} {formattedTime}</h2>
      <h2>Espacios Disponibles: {cuposDisponibles}</h2>
      <h3>Escriba patente</h3>



      {/* Campo de texto para patente */}
      <div>
        <input
          type="text"
          value={texto}
          onChange={handleTextChange}
          placeholder="BBB-BBB"
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
          backgroundColor: "#058d32ff", // verde hermoso
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


//ESTILOS, PASAR A CSS? nose usarlo

const styles = {
  pagina: { 
    display: "flex",
    flexDirection: "column", // aplien
    alignItems: "center", //decoren abrendegen
    height: "100vh",
    textAlign: "center", 
  }
  }

