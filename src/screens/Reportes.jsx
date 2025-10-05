import Header from "../components/header";
import "../styles/Global.css";
import React, { useState, useEffect } from "react";
import { db } from "../services/db";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";

export default function Reportes() {
  const [todosRegistros, setTodosRegistros] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState("");
  const [personaFiltro, setPersonaFiltro] = useState("");
  const [vehiculoFiltro, setVehiculoFiltro] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarRegistros();
  }, []);

  async function cargarRegistros() {
    const registrosDB = await db.registro.toArray();
    const vehiculos = await db.vehiculo.toArray();
    const personas = await db.persona.toArray();

    const combinados = registrosDB.map((r) => {
      const veh = vehiculos.find((v) => v.placa === r.idVehiculo);
      const per = personas.find((p) => p.rut === r.rutPersona);
      return {
        id: r.id,
        fecha: r.fecha,
        entrada: r.entrada,
        salida: r.salida,
        placa: veh?.placa || "N/A",
        tipo: veh?.tipo || "N/A",
        rutPersona: per?.rut || "N/A",
        nombre: per?.nombre || "N/A",
        fono: per?.fono || "N/A",
      };
    });

    setTodosRegistros(combinados);
    setCargando(false);
  }

  function filtrarRegistros() {
    return todosRegistros.filter((r) => {
      const coincideFecha = fechaFiltro
        ? (() => {
            if (!r.fecha) return false;

            const partes = r.fecha.split("/");
            if (partes.length !== 3) return false;

            const dia = partes[0].padStart(2, "0");
            const mes = partes[1].padStart(2, "0");
            const anio = partes[2];
            const fechaNormalizada = `${anio}-${mes}-${dia}`;

            return fechaNormalizada === fechaFiltro;
          })()
        : true;

      const coincidePersona = personaFiltro
        ? (r.nombre?.toLowerCase().includes(personaFiltro.toLowerCase()) ||
          r.rutPersona?.toLowerCase().includes(personaFiltro.toLowerCase()))
        : true;

      const coincideVehiculo = vehiculoFiltro
        ? r.placa?.toLowerCase().includes(vehiculoFiltro.toLowerCase())
        : true;

      return coincideFecha && coincidePersona && coincideVehiculo;
    });
  }

  async function guardarArchivoAndroid(nombre, contenidoBase64) {
    try {
      const result = await Filesystem.writeFile({
        path: nombre,
        data: contenidoBase64,
        directory: Directory.External,
        encoding: "base64",
      });
      alert(`Archivo guardado en Descargas:\n${result.uri}`);
    } catch (e) {
      console.error("Error guardando archivo", e);
    }
  }

  function descargarArchivoPC(nombre, contenidoBase64, tipo) {
    const link = document.createElement("a");
    link.href = `data:${tipo};base64,${contenidoBase64}`;
    link.download = nombre;
    link.click();
  }

  async function generarPDF() {
    const datosFiltrados = filtrarRegistros();

    if (datosFiltrados.length === 0) {
      alert("No hay registros disponibles para esos filtros.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Reporte de Vehículos", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["ID", "Fecha", "Placa", "Tipo", "Nombre", "RUT", "Entrada", "Salida"]],
      body: datosFiltrados.map((r) => [
        r.id,
        r.fecha,
        r.placa,
        r.tipo,
        r.nombre,
        r.rutPersona,
        r.entrada,
        r.salida,
      ]),
      styles: { fontSize: 9 },
    });

    const pdfBase64 = doc.output("datauristring").split(",")[1];

    if (Capacitor.getPlatform() === "android") {
      await guardarArchivoAndroid("ReporteFiltrado.pdf", pdfBase64);
    } else {
      descargarArchivoPC("ReporteFiltrado.pdf", pdfBase64, "application/pdf");
    }
  }

  async function generarExcel() {
    const datosFiltrados = filtrarRegistros();

    if (datosFiltrados.length === 0) {
      alert("No hay registros disponibles para esos filtros.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(datosFiltrados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");
    const excelBase64 = XLSX.write(workbook, { bookType: "xlsx", type: "base64" });

    if (Capacitor.getPlatform() === "android") {
      await guardarArchivoAndroid("ReporteFiltrado.xlsx", excelBase64);
    } else {
      descargarArchivoPC(
        "ReporteFiltrado.xlsx",
        excelBase64,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
    }
  }

  if (cargando) {
    return <div>Cargando registros...</div>;
  }

  return (
    <div className="screen-main">
      <Header />
      <main className="reportes-main">
        <h1>REPORTES</h1>

        <div style={{ marginBottom: "20px" }}>
          <label>Filtrar por fecha: </label>
          <input
            type="date"
            value={fechaFiltro}
            onChange={(e) => setFechaFiltro(e.target.value)}
          />
          <br />
          <label>Filtrar por persona (nombre o RUT): </label>
          <input
            type="text"
            placeholder="Ej: Juan o 12345678-9"
            value={personaFiltro}
            onChange={(e) => setPersonaFiltro(e.target.value)}
          />
          <br />
          <label>Filtrar por vehículo (placa): </label>
          <input
            type="text"
            placeholder="Ej: ABC123"
            value={vehiculoFiltro}
            onChange={(e) => setVehiculoFiltro(e.target.value)}
          />
        </div>

        <div className="menu-buttons">
          <button type="button" onClick={generarPDF} className="menu-btn">
            DESCARGAR PDF
          </button>

          <button type="button" onClick={generarExcel} className="menu-btn">
            DESCARGAR EXCEL
          </button>
        </div>

        <div style={{ marginTop: "20px" }}>
          <h3>Total registros: {filtrarRegistros().length}</h3>
        </div>
      </main>
    </div>
  );
}
