import type { Cliente, Vehiculo } from '../models/parking';

const PROTOCOLO = 'http';
const HOST = '10.0.2.2:8080';
export const API_URL = `${PROTOCOLO}://${HOST}/api`;

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const urlCompleta = `${API_URL}${endpoint}`;
  const res = await fetch(urlCompleta, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Error HTTP ${res.status}: ${res.statusText}`);
  }

  if (res.status === 204) {
    return {} as T;
  }

  return res.json();
}

export const clienteApi = {
  obtenerTodos: () => request<Cliente[]>('/clientes'),
  obtenerPorId: (id: number) => request<Cliente>(`/clientes/${id}`),
  crear: (cliente: Omit<Cliente, 'id'>) =>
    request<Cliente>('/clientes', {
      method: 'POST',
      body: JSON.stringify(cliente),
    }),
  actualizar: (id: number, cliente: Omit<Cliente, 'id'>) =>
    request<Cliente>(`/clientes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cliente),
    }),
  eliminar: (id: number) => request<void>(`/clientes/${id}`, { method: 'DELETE' }),
};

export const vehiculoApi = {
  obtenerTodos: () => request<Vehiculo[]>('/vehiculos'),
  obtenerPorId: (id: number) => request<Vehiculo>(`/vehiculos/${id}`),
  crear: (vehiculo: Omit<Vehiculo, 'id'>) =>
    request<Vehiculo>('/vehiculos', {
      method: 'POST',
      body: JSON.stringify(vehiculo),
    }),
  actualizar: (id: number, vehiculo: Omit<Vehiculo, 'id'>) =>
    request<Vehiculo>(`/vehiculos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(vehiculo),
    }),
  eliminar: (id: number) => request<void>(`/vehiculos/${id}`, { method: 'DELETE' }),
};
