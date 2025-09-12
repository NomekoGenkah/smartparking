import Header from "../components/header";
import "../styles/Global.css"

export default function Registro(){
    return(
        <div>
            <Header></Header>
            <h1>REGISTRO</h1>
            <h3>Espacios disponibles 46/50</h3>

            <div className="menu-buttons">
                <button className="menu-btn">Ingreso</button>
                <button className="menu-btn">Salida</button>
                <button className="menu-btn">Lista de vehiculos</button>
            </div>
        </div>
    );
}