import Header from "../components/header";
import "../styles/Global.css";

import { useState } from "react";
import { registrarEntrada } from "../services/parkingService";
import { verificarEntrada } from "../services/parkingService";
import { useConfig } from "../context/ConfigContext";

export default function Registro() {
    const { disponibles, capacidad, recalcEspaciosUsados } = useConfig();

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

        // 🚫 Verificar disponibilidad de espacios
        if (capacidad <= 0) {
            alert("No se puede registrar: la capacidad total es 0.");
            return;
        }
        if (disponibles <= 0) {
            alert("No hay espacios disponibles en el estacionamiento.");
            return;
        }

        try {
            const esValido = await verificarEntrada(form);

            if (esValido == 1) {
                await registrarEntrada(form);
                alert("Entrada registrada con éxito.");

                setForm({
                    rut: "",
                    nombre: "",
                    fono: "",
                    placa: "",
                    tipo: "",
                });

                recalcEspaciosUsados();
            } else {
                alert("Error al registrar entrada. Verifique los datos ingresados.");
            }
        } catch (error) {
            console.error("Error en handleSubmit:", error);
            alert("Hubo un error inesperado. Intenta nuevamente.");
        }
    };

    return (
        <div className="screen-main">
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

                <h3>Espacios disponibles: {disponibles} / {capacidad}</h3>

                {/* Botón */}
                <button type="submit" className="menu-btn">Registrar Entrada</button>
            </form>
        </div>
    );
}
