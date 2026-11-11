import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Cliente, Vehiculo } from '../models/parking';
import { initialState, parkingReducer, type ParkingAction } from './parkingReducer';

type ParkingContextType = {
  clientes: Cliente[];
  vehiculos: Vehiculo[];
  dispatch: React.Dispatch<ParkingAction>;
};

const ParkingContext = createContext<ParkingContextType | undefined>(undefined);

export function ParkingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(parkingReducer, initialState);

  return (
    <ParkingContext.Provider
      value={{ clientes: state.clientes, vehiculos: state.vehiculos, dispatch }}
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
