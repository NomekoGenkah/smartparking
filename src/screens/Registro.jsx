import Header from "../components/header";
import "../styles/Global.css"

import { useState } from "react";
import { registrarEntrada } from "../services/parkingService";

export default function Registro(){


    const [form, setForm] = useState({
        rut: "",
        nombre: "",
        fono: "",
        placa: "",
        tipo: "",
    });

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };
    

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registrarEntrada(form);
      alert("Entrada registrada con éxito ✅");

      // limpiar formulario
      setForm({
        rut: "",
        nombre: "",
        fono: "",
        placa: "",
        tipo: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error al registrar entrada ❌");
    }
  };


    return(
        <div>
            <Header />

            <form onSubmit={handleSubmit}>
            {/* Card Persona */}
                <section className="form-card">
                    <h2>Datos de la Persona</h2>

                    <div className="form-group">
                    <label>
                        RUT<span style={{ color: "red" }}>* </span>
                    </label>
                    <input
                        name="rut"
                        value={form.rut}
                        onChange={handleChange}
                        placeholder="RUT"
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label>Nombre </label>
                    <input
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        placeholder="Nombre"
                    />
                    </div>

                    <div className="form-group">
                    <label>Teléfono </label>
                    <input
                        name="fono"
                        value={form.fono}
                        onChange={handleChange}
                        placeholder="Teléfono"
                    />
                    </div>
                </section>

                {/* Card Vehículo */}
                <section className="form-card">
                    <h2>Datos del Vehículo</h2>

                    <div className="form-group">
                    <label>
                        Placa<span style={{ color: "red" }}>* </span>
                    </label>
                    <input
                        name="placa"
                        value={form.placa}
                        onChange={handleChange}
                        placeholder="Placa"
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label>Tipo </label>
                    <input
                        name="tipo"
                        value={form.tipo}
                        onChange={handleChange}
                        placeholder="Tipo (auto, moto, etc.)"
                    />
                    </div>
                </section>

                {/* Botón */}
                <button type="submit" className="menu-btn">Registrar Entrada</button>
            </form>



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