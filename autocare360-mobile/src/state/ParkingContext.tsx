import React, { createContext, useContext, useEffect, useReducer, useState, type ReactNode } from 'react';
import type { Cliente, Vehiculo } from '../models/parking';
import { clienteApi, vehiculoApi } from '../services/api';
import { initialState, parkingReducer, type ParkingAction } from './parkingReducer';

type ParkingContextType = {
  clientes: Cliente[];
  vehiculos: Vehiculo[];
  cargando: boolean;
  error: string | null;
  sincronizarConBackend: () => Promise<void>;
  dispatch: React.Dispatch<ParkingAction>;
};

const ParkingContext = createContext<ParkingContextType | undefined>(undefined);

export function ParkingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(parkingReducer, initialState);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function sincronizarConBackend() {
    setCargando(true);
    setError(null);
    try {
      const [listaClientes, listaVehiculos] = await Promise.all([
        clienteApi.obtenerTodos(),
        vehiculoApi.obtenerTodos(),
      ]);
      dispatch({
        type: 'CARGAR_DATOS_BACKEND',
        payload: { clientes: listaClientes, vehiculos: listaVehiculos },
      });
    } catch (err) {
      const msj = err instanceof Error ? err.message : 'Error desconocido de red';
      console.log('Backend Spring Boot sin conexión (modo local activo):', msj);
      setError('Sin conexión con Spring Boot (usando datos de demostración en memoria)');
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    sincronizarConBackend();
  }, []);

  return (
    <ParkingContext.Provider
      value={{
        clientes: state.clientes,
        vehiculos: state.vehiculos,
        cargando,
        error,
        sincronizarConBackend,
        dispatch,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
}

export function useParking(): ParkingContextType {
  const context = useContext(ParkingContext);
  if (!context) {
    throw new Error('useParking debe usarse dentro de un ParkingProvider');
  }
  return context;
}
