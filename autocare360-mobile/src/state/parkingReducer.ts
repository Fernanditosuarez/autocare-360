import type { Cliente, Vehiculo } from '../models/parking';
import { CLIENTES as INITIAL_CLIENTES, VEHICULOS as INITIAL_VEHICULOS } from '../data/demoData';

export type ParkingState = {
  clientes: Cliente[];
  vehiculos: Vehiculo[];
};

export type ParkingAction =
  | { type: 'CARGAR_DATOS_BACKEND'; payload: { clientes: Cliente[]; vehiculos: Vehiculo[] } }
  | { type: 'CLIENTE_CREAR'; payload: Cliente }
  | { type: 'CLIENTE_EDITAR'; payload: Cliente }
  | { type: 'CLIENTE_ELIMINAR'; payload: number }
  | { type: 'VEHICULO_CREAR'; payload: Vehiculo }
  | { type: 'VEHICULO_EDITAR'; payload: Vehiculo }
  | { type: 'VEHICULO_ELIMINAR'; payload: number };

export const initialState: ParkingState = {
  clientes: [...INITIAL_CLIENTES],
  vehiculos: [...INITIAL_VEHICULOS],
};

export function siguienteId(lista: readonly { id: number }[]): number {
  return lista.length > 0 ? Math.max(...lista.map((item) => item.id)) + 1 : 1;
}

export function parkingReducer(state: ParkingState, action: ParkingAction): ParkingState {
  switch (action.type) {
    case 'CARGAR_DATOS_BACKEND':
      return {
        ...state,
        clientes: action.payload.clientes,
        vehiculos: action.payload.vehiculos,
      };
    case 'CLIENTE_CREAR':
      return { ...state, clientes: [...state.clientes, action.payload] };
    case 'CLIENTE_EDITAR':
      return {
        ...state,
        clientes: state.clientes.map((c) => (c.id === action.payload.id ? action.payload : c)),
      };
    case 'CLIENTE_ELIMINAR':
      return {
        ...state,
        clientes: state.clientes.filter((c) => c.id !== action.payload),
        vehiculos: state.vehiculos.filter((v) => v.clienteId !== action.payload),
      };
    case 'VEHICULO_CREAR':
      return { ...state, vehiculos: [...state.vehiculos, action.payload] };
    case 'VEHICULO_EDITAR':
      return {
        ...state,
        vehiculos: state.vehiculos.map((v) => (v.id === action.payload.id ? action.payload : v)),
      };
    case 'VEHICULO_ELIMINAR':
      return {
        ...state,
        vehiculos: state.vehiculos.filter((v) => v.id !== action.payload),
      };
    default:
      return state;
  }
}
