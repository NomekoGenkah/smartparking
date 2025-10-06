import { db } from "./db";


export async function verificarEntrada({ rut, nombre = null, fono = null, placa, tipo = null }) {
    console.log("verificarEntrada recibida:", { rut, nombre, fono, placa, tipo });

    // 🔹 Validar RUT
    if (!rut) return false;

    // 1. Normalizar: quitar puntos, guiones y espacios
    rut = rut.replace(/[\.\-\s]/g, '').toUpperCase();

    // 2. Separar cuerpo y dígito verificador
    const cuerpo = rut.slice(0, -1);
    const dvIngresado = rut.slice(-1);

    if (!/^\d+$/.test(cuerpo)) {
        console.warn("RUT inválido: contiene caracteres no numéricos");
        return false;
    }

    // 3. Calcular dígito verificador
    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador < 7 ? multiplicador + 1 : 2;
    }

    const resto = suma % 11;
    const dvCalculado = resto === 0 ? '0' : resto === 1 ? 'K' : String(11 - resto);

    // 4. Comparar dígitos verificadores
    if (dvCalculado !== dvIngresado) {
        console.warn(`RUT inválido: DV esperado ${dvCalculado}, recibido ${dvIngresado}`);
        return false;
    }

    // 🔹 Validar PLACA
    let placaFormatted = placa.toUpperCase().replace(/[\s-]/g, '');
    const caracteresValidos = /^[A-Z0-9]+$/;

    if (
        placaFormatted !== "" &&
        (placaFormatted.length === 6 || placaFormatted.length === 5) &&
        caracteresValidos.test(placaFormatted)
    ) {
        return true;
    } else {
        console.warn("Placa inválida");
        return false;
    }
}




export async function registrarEntrada({rut, nombre = null, fono = null, placa, tipo = null}) {

    placa = placa.toUpperCase();
    placa = placa.replace(/[\s-]/g, ''); 

    await db.persona.put({rut, nombre, fono});

    await db.vehiculo.put({placa, tipo, rutPersona: rut});

    await db.registro.add({
        idVehiculo: placa,
        rutPersona: rut,
        entrada: new Date().toISOString(),
        salida: null,
        fecha: new Date().toLocaleDateString(),
    });   
}


export async function registrarSalida(placa) {

    const registro = await db.registro
    .where("idVehiculo")
    .equals(placa)
    .filter(r => r.salida === null)
    .last();
    
    if(!registro){
        throw new Error("No se encontro un registro abierto para esa placa");
    }

    await db.registro.update(registro.id, {
        salida: new Date().toISOString(),
    });
}

export async function getActivos() {
  return await db.registro
    .filter(r => r.salida === null)
    .toArray();
}

/**
 * Busca una persona por RUT
 */
export async function getPersona(rut) {
  return await db.persona.get(rut);
}

export async function getVehiculo(placa) {
  return await db.vehiculo.get(placa);
}

