// src/pages/Ajustes.jsx
import { useState, useEffect } from "react";
import { useConfig } from "../context/ConfigContext";
import Header from "../components/header";

export default function Ajustes() {
  const { capacidad, disponibles, updateCapacidad } = useConfig();
  const [valor, setValor] = useState(capacidad);

  // Actualizar el input si cambia el valor global
  useEffect(() => {
    setValor(capacidad);
  }, [capacidad]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const ocupados = capacidad - disponibles;

    // 🚫 No permitir capacidad menor a los vehículos actuales
    if (valor < ocupados) {
      alert(
        `No puedes establecer una capacidad menor a la cantidad actual de vehículos (${ocupados}).`
      );
      return;
    }

    updateCapacidad(valor);
    alert("Capacidad actualizada ✅");
  };

  return (
    <div className="screen-main">
      <Header />

      <h1>Ajustes</h1>

      <section className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Cantidad total de espacios</label>
            <input
              type="number"
              value={valor}
              min={0}
              onChange={(e) => setValor(parseInt(e.target.value))}
            />
          </div>

          <button type="submit" className="menu-btn">
            Guardar
          </button>
        </form>
      </section>
    </div>
  );
}
