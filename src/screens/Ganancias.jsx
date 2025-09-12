import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import Header from "../components/header";
import "../styles/Global.css"

export default function Ganancias() {
 const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('history');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  const formatDate = date =>
    new Date(date).toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' +
    new Date(date).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const filteredHistory = history.filter(item => {
    const itemExit = new Date(item.exitTime);
    const [year, month, day] = selectedDate.split('-').map(Number);

    return (
      itemExit.getFullYear() === year &&
      (itemExit.getMonth() + 1) === month &&
      itemExit.getDate() === day
    );
  });

  const total = filteredHistory.reduce((sum, item) => sum + item.amount, 0);

  const generateDailyReportPDF = async () => {
    if (!filteredHistory.length) {
      alert('No hay datos para el reporte de esta fecha.');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Reporte Diario de Estacionamiento - ${selectedDate}`, 20, 20);

    let y = 40;
    doc.setFontSize(12);

    let totalLocal = 0;
    filteredHistory.forEach((record, i) => {
      doc.text(`${i + 1}. Patente: ${record.patente}`, 20, y);
      y += 8;
      doc.text(`   Entrada: ${formatDate(record.entryTime)}`, 20, y);
      y += 8;
      doc.text(`   Salida: ${formatDate(record.exitTime)}`, 20, y);
      y += 8;
      doc.text(`   Cobro: $${record.amount}`, 20, y);
      y += 12;

      totalLocal += record.amount;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.setFontSize(14);
    doc.text(`Ganancias Totales: $${totalLocal}`, 20, y + 10);

    const base64Pdf = doc.output('datauristring').split(',')[1];
    const fileName = `reporte-diario-${selectedDate}-${Date.now()}.pdf`;

    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Pdf,
      directory: Directory.Documents,
    });

    await Share.share({
      title: 'Reporte Diario PDF',
      url: savedFile.uri,
      dialogTitle: 'Compartir o abrir Reporte Diario PDF',
      type: 'application/pdf',
    });
  };

  return (
    <div className="container">
      <Header></Header>
      <h2 className="title">Reporte Diario de Ganancias</h2>
      <label htmlFor="datePicker">Selecciona la fecha: </label>
      <input
        type="date"
        id="datePicker"
        value={selectedDate}
        onChange={e => setSelectedDate(e.target.value)}
        style={{ marginBottom: 15, padding: 6 }}
      />

      <p>Ganancias totales: ${total}</p>
      {filteredHistory.length > 0 ? (
        <ul>
          {filteredHistory.map((item, i) => (
            <li key={i}>
              Patente: {item.patente} | Entrada: {formatDate(item.entryTime)} | Salida: {formatDate(item.exitTime)} | Cobro: ${item.amount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay registros para esta fecha.</p>
      )}
      <button onClick={generateDailyReportPDF} className="button">
        Descargar Reporte Diario PDF
      </button>
    </div>
  );
}