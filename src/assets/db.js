import Dexie from "dexie";

export const db = new Dexie("SmartParkingDB");

db.version(1).stores({
    persona: "rut, nombre, fono" ,
    vehiculo: "placa, tipo, rutPersona",
    registro: "++id, idVehiculo, rutPersona, entrada, salida, fecha"
});