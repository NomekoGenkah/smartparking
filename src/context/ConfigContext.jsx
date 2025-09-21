import { createContext, useContext, useEffect, useState } from "react";
import { Preferences } from "@capacitor/preferences";
import { loadConfigFromFile } from "vite";

const ConfigContext = createContext();

export function ConfigProvider({ children}){
    const [capacidad, setCapacidad] = useState(0);

    useEffect(() => {
        const loadConfig = async () => {
        const { value } = await Preferences.get({ key: "capacidad" });
        if (value) setCapacidad(parseInt(value));
        };
        loadConfig();
    }, []);

    const updateCapacidad = async (nuevoValor) => {
        setCapacidad(nuevoValor);
        await Preferences.set({
        key: "capacidad",
        value: String(nuevoValor),
        });
    };

    return(
        <ConfigContext.Provider value={{ capacidad, updateCapacidad }}>
            {children}
        </ConfigContext.Provider>
    );
}

export function useConfig() {
  return useContext(ConfigContext);
}

