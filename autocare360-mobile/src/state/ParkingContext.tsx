import React, { createContext, useContext, useEffect, useReducer, useState, type ReactNode } from 'react';
import type { Cliente, Vehiculo } from '../models/parking';
import { clienteApi, vehiculoApi } from '../services/api';
import { initialState, parkingReducer, siguienteId, type ParkingAction } from './parkingReducer';

type ParkingContextType = {
  clientes: Cliente[];
  vehiculos: Vehiculo[];
  cargando: boolean;
  error: string | null;
  sincronizarConBackend: () => Promise<void>;
  crearCliente: (datos: Omit<Cliente, 'id'>) => Promise<boolean>;
  editarCliente: (id: number, datos: Omit<Cliente, 'id'>) => Promise<boolean>;
  eliminarCliente: (id: number) => Promise<boolean>;
  crearVehiculo: (datos: Omit<Vehiculo, 'id'>) => Promise<boolean>;
  editarVehiculo: (id: number, datos: Omit<Vehiculo, 'id'>) => Promise<boolean>;
  eliminarVehiculo: (id: number) => Promise<boolean>;
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

  async function crearCliente(datos: Omit<Cliente, 'id'>): Promise<boolean> {
    try {
      const nuevo = await clienteApi.crear(datos);
      dispatch({ type: 'CLIENTE_CREAR', payload: nuevo });
      return true;
    } catch (err) {
      console.log('Fallo al crear cliente en API (usando fallback local):', err);
      const nuevoLocal: Cliente = { id: siguienteId(state.clientes), ...datos };
      dispatch({ type: 'CLIENTE_CREAR', payload: nuevoLocal });
      return true;
    }
  }

  async function editarCliente(id: number, datos: Omit<Cliente, 'id'>): Promise<boolean> {
    try {
      const actualizado = await clienteApi.actualizar(id, datos);
      dispatch({ type: 'CLIENTE_EDITAR', payload: actualizado });
      return true;
    } catch (err) {
      console.log('Fallo al actualizar cliente en API (usando fallback local):', err);
      dispatch({ type: 'CLIENTE_EDITAR', payload: { id, ...datos } });
      return true;
    }
  }

  async function eliminarCliente(id: number): Promise<boolean> {
    try {
      await clienteApi.eliminar(id);
      dispatch({ type: 'CLIENTE_ELIMINAR', payload: id });
      return true;
    } catch (err) {
      console.log('Fallo al eliminar cliente en API (usando fallback local):', err);
      dispatch({ type: 'CLIENTE_ELIMINAR', payload: id });
      return true;
    }
  }

  async function crearVehiculo(datos: Omit<Vehiculo, 'id'>): Promise<boolean> {
    try {
      const nuevo = await vehiculoApi.crear(datos);
      dispatch({ type: 'VEHICULO_CREAR', payload: nuevo });
      return true;
    } catch (err) {
      console.log('Fallo al crear vehículo en API (usando fallback local):', err);
      const nuevoLocal: Vehiculo = { id: siguienteId(state.vehiculos), ...datos };
      dispatch({ type: 'VEHICULO_CREAR', payload: nuevoLocal });
      return true;
    }
  }

  async function editarVehiculo(id: number, datos: Omit<Vehiculo, 'id'>): Promise<boolean> {
    try {
      const actualizado = await vehiculoApi.actualizar(id, datos);
      dispatch({ type: 'VEHICULO_EDITAR', payload: actualizado });
      return true;
    } catch (err) {
      console.log('Fallo al actualizar vehículo en API (usando fallback local):', err);
      dispatch({ type: 'VEHICULO_EDITAR', payload: { id, ...datos } });
      return true;
    }
  }

  async function eliminarVehiculo(id: number): Promise<boolean> {
    try {
      await vehiculoApi.eliminar(id);
      dispatch({ type: 'VEHICULO_ELIMINAR', payload: id });
      return true;
    } catch (err) {
      console.log('Fallo al eliminar vehículo en API (usando fallback local):', err);
      dispatch({ type: 'VEHICULO_ELIMINAR', payload: id });
      return true;
    }
  }

  return (
    <ParkingContext.Provider
      value={{
        clientes: state.clientes,
        vehiculos: state.vehiculos,
        cargando,
        error,
        sincronizarConBackend,
        crearCliente,
        editarCliente,
        eliminarCliente,
        crearVehiculo,
        editarVehiculo,
        eliminarVehiculo,
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
