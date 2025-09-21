import { useEffect, useState } from "react";
import { getActivos, getVehiculo, getPersona, registrarSalida } from "../services/parkingService";
import { useConfig } from "../context/ConfigContext";
import Header from "../components/header";
import "../styles/Global.css";

export default function SalidaVehiculos() {
  const { recalcEspaciosUsados } = useConfig();
  const [activos, setActivos] = useState([]);

  // Cargar vehículos activos
  const loadActivos = async () => {
    const registros = await getActivos();

    // Para cada registro, obtener info del vehiculo y persona
    const infoCompletos = await Promise.all(
      registros.map(async (r) => {
        const vehiculo = await getVehiculo(r.idVehiculo);
        const persona = await getPersona(r.rutPersona);
        return {
          ...r,
          vehiculo,
          persona,
        };
      })
    );

    setActivos(infoCompletos);
  };

  useEffect(() => {
    loadActivos();
  }, []);

  // Marcar salida de un vehículo
  const handleSalida = async (placa) => {
    try {
      await registrarSalida(placa);
      alert(`Salida registrada para ${placa} ✅`);

      // actualizar listado y espacios
      await loadActivos();
      recalcEspaciosUsados();
    } catch (error) {
      console.error(error);
      alert("Error al registrar salida ❌");
    }
  };

  return (
    <div className="screen-main">
      <Header />
      <h1>Vehículos Activos</h1>

      {activos.length === 0 ? (
        <p>No hay vehículos dentro del estacionamiento.</p>
      ) : (
        <section className="form-card">
          {activos.map((r) => (
            <div key={r.id} className="form-group" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>{r.vehiculo?.placa}</strong> - {r.vehiculo?.tipo || "Desconocido"} <br/>
                {r.persona?.nombre} ({r.persona?.rut})
              </div>
              <button
                className="menu-btn"
                type="button"
                onClick={() => handleSalida(r.vehiculo.placa)}
              >
                Marcar Salida
              </button>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
