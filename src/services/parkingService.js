import { db } from "./db";


export async function verificarEntrada({ rut, nombre = null, fono = null, placa, tipo = null }) {
    console.log("verificarEntrada recibida:", { rut, nombre, fono, placa, tipo });

    //AQUI AHORA SE PUEDEN PONER MAS COMPROBACIONES


    //RUT (lo del digito verificador)
    rut = rut.replace(/[\s-]/g, ''); //eliminacion de guinoes y espacios
    let rutWithoutLastDigit = rut.slice(0, -1); //eliminacion de digito verificador
    let rutInt = parseInt(rutWithoutLastDigit); //
    //aca lo del digito verificador que no recuerdo como se hace
    //hay que hacer que calcule el digito verificador, luego combine el rutInt con el digito verificador en un string, y que compare ese string con el originalformateado
    alert(rutInt);


    //PLACA
    //Formateo correcto elimiacion de webadas
    let placaFormatted = placa.toUpperCase();
    placaFormatted = placaFormatted.replace(/[\s-]/g, ''); 


    //caracteres
    const caracteresValidos = /[^ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789]/;
    const NoesValido = caracteresValidos.test(placaFormatted); // true si hay caracteres no permitidos


    if (placaFormatted !== "" && (placaFormatted.length === 6 || placaFormatted.length === 5) && !NoesValido) {
        return true;  
    } else {
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

