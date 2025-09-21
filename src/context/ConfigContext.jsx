import { createContext, useContext, useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";
import { db } from "../services/db";

const ConfigContext = createContext();

export function ConfigProvider({ children}){
    const [capacidad, setCapacidad] = useState(0);
    const [espaciosUsados, setEspaciosUsados] = useState(0);

    useEffect(() => {
        const loadConfig = async () => {
            const { value } = await Preferences.get({ key: "capacidad" });
            if (value) setCapacidad(parseInt(value));
        };
        loadConfig();
    }, []);

    useEffect(() => {
        const loadUsados = async () => {
            const activos = await db.registro.filter(r => r.salida === null).count();
            setEspaciosUsados(activos);
        };
        loadUsados();

        // Opcional: actualizar cada cierto tiempo
        const interval = setInterval(loadUsados, 5000); // cada 5s
        return () => clearInterval(interval);
    }, []);

    const updateCapacidad = async (nuevoValor) => {
        setCapacidad(nuevoValor);
        await Preferences.set({
            key: "capacidad",
            value: String(nuevoValor),
        });
    };

    const recalcEspaciosUsados = async () => {
        const activos = await db.registro.filter(r => r.salida === null).count();
        setEspaciosUsados(activos);
    };

    return(
        <ConfigContext.Provider value={{
            capacidad,
            updateCapacidad,
            espaciosUsados,
            recalcEspaciosUsados,
            disponibles: capacidad - espaciosUsados }}>
            {children}
        </ConfigContext.Provider>
    );
}

export function useConfig() {
  return useContext(ConfigContext);
}

