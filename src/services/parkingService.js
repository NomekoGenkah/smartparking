import { db } from "./db";


export async function verificarEntrada({ rut, nombre = null, fono = null, placa, tipo = null }) {
    console.log("verificarEntrada recibida:", { rut, nombre, fono, placa, tipo });

    //AQUI AHORA SE PUEDEN PONER MAS COMPROBACIONES


    //RUT (lo del digito verificador)



    //PLACA
    //Formateo correcto elimiacion de webadas
    let placaFormatted = placa.toUpperCase();
    placaFormatted = placaFormatted.replace(/[\s-]/g, ''); 
    console.log("Placa formateada:", placaFormatted);

    //caracteres
    const caracteresValidos = /[^ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789]/;
    const NoesValido = caracteresValidos.test(placaFormatted); // true si hay caracteres no permitidos
    console.log("Es válida la placa:", !NoesValido);

    if (placaFormatted !== "" && (placaFormatted.length === 6 || placaFormatted.length === 5) && !NoesValido) {
        return true;  
    } else {
        return false;  
    }
}



export async function registrarEntrada({rut, nombre = null, fono = null, placa, tipo = null}) {

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

