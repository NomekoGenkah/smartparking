import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

const RATE_PER_MINUTE = 25;
const MAX_SPACES = 60;

export default function MartinPage() {
  const [patenteInput, setPatenteInput] = useState('');
  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem('vehicles');
    return saved ? JSON.parse(saved) : [];
  });
  const [lastTicket, setLastTicket] = useState(null);
  const [showPatentes, setShowPatentes] = useState(false);

  useEffect(() => {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  const formatDate = date =>
    new Date(date).toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' +
    new Date(date).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const handleEntry = () => {
    if (vehicles.length >= MAX_SPACES) {
      alert('Estacionamiento lleno');
      return;
    }
    if (vehicles.some(v => v.patente === patenteInput)) {
      alert('Patente ya registrada');
      return;
    }
    setVehicles([...vehicles, { patente: patenteInput, entryTime: new Date() }]);
    setPatenteInput('');
    setLastTicket(null);
  };

  const handleExit = () => {
    const vehicle = vehicles.find(v => v.patente === patenteInput);
    if (!vehicle) {
      alert('Patente no encontrada');
      return;
    }
    const exitTime = new Date();
    const minutes = Math.ceil((exitTime - new Date(vehicle.entryTime)) / 60000);
    const amount = Math.floor(minutes * RATE_PER_MINUTE);

    setLastTicket({
      patente: vehicle.patente,
      entryTime: formatDate(vehicle.entryTime),
      exitTime: formatDate(exitTime),
      minutes,
      amount,
    });

    const savedHistory = localStorage.getItem('history');
    const history = savedHistory ? JSON.parse(savedHistory) : [];
    history.push({
      patente: vehicle.patente,
      entryTime: vehicle.entryTime,
      exitTime,
      minutes,
      amount,
    });
    localStorage.setItem('history', JSON.stringify(history));

    setVehicles(vehicles.filter(v => v.patente !== patenteInput));
    setPatenteInput('');
  };

  const generateTicketPDF = async () => {
    if (!lastTicket) {
      alert('No hay boleta para imprimir');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Boleta de Estacionamiento', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    doc.setFontSize(14);
    doc.text('Universidad de La Serena "Facultad Bongard"', doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });

    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(20, 35, doc.internal.pageSize.getWidth() - 20, 35);

    doc.setFontSize(12);
    doc.text('Patente:', 20, 50);
    doc.text(lastTicket.patente, 60, 50);

    doc.text('Entrada:', 20, 60);
    doc.text(lastTicket.entryTime, 60, 60);

    doc.text('Salida:', 20, 70);
    doc.text(lastTicket.exitTime, 60, 70);

    doc.text('Tiempo:', 20, 80);
    doc.text(`${lastTicket.minutes} minutos`, 60, 80);

    doc.text('Total a pagar:', 20, 90);
    doc.text(`$${lastTicket.amount}`, 60, 90);

    const base64Pdf = doc.output('datauristring').split(',')[1];
    const fileName = `boleta-${lastTicket.patente}-${Date.now()}.pdf`;

    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Pdf,
      directory: Directory.Documents,
    });

    await Share.share({
      title: 'Boleta PDF',
      url: savedFile.uri,
      dialogTitle: 'Compartir o abrir Boleta PDF',
      type: 'application/pdf',
    });
  };

  return (
    <div className="container">
      <h2 className="title">Ingreso/Salida Estacionamiento</h2>
      <p>Ingrese la patente para registrar la entrada/salida.<br />Puede generar la boleta al finalizar.</p>
      <p>Espacios disponibles: {MAX_SPACES - vehicles.length} de {MAX_SPACES}</p>
      <input
        type="text"
        placeholder="Patente"
        value={patenteInput}
        onChange={e => setPatenteInput(e.target.value.toUpperCase())}
      />
      <button onClick={handleEntry} className="button">Registrar Entrada</button>
      <button onClick={handleExit} className="button">Registrar Salida</button>

      <button onClick={() => setShowPatentes(!showPatentes)} className="button">
        {showPatentes ? 'Ocultar Patentes Dentro' : 'Ver Patentes Dentro'}
      </button>

      {showPatentes && (
        <ul>
          {vehicles.map(v => (
            <li key={v.patente}>{v.patente}</li>
          ))}
        </ul>
      )}

      {lastTicket && (
        <div className="boleta">
          <h3>Boleta</h3>
          <p>Patente: {lastTicket.patente}</p>
          <p>Entrada: {lastTicket.entryTime}</p>
          <p>Salida: {lastTicket.exitTime}</p>
          <p>Tiempo: {lastTicket.minutes} minutos</p>
          <p>Total a pagar: ${lastTicket.amount}</p>
          <button onClick={generateTicketPDF} className="button">
            Descargar Boleta PDF
          </button>
        </div>
      )}
    </div>
  );
}
