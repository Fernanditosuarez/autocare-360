import * as SecureStore from 'expo-secure-store';
import type { Cliente, Vehiculo } from '../models/parking';

const PROTOCOLO = 'http';
const HOST = '10.0.2.2:8080';
export const API_URL = `${PROTOCOLO}://${HOST}/api`;

const TOKEN_KEY = 'autocare360_jwt_token';

export async function obtenerTokenGuardado(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch {
    return null;
  }
}

export async function guardarToken(token: string): Promise<void> {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function eliminarToken(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = await obtenerTokenGuardado();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options?.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    throw new Error('401: No autorizado o token expirado');
  }

  if (!res.ok) {
    throw new Error(`Error HTTP ${res.status}: ${res.statusText}`);
  }

  if (res.status === 204) {
    return {} as T;
  }

  return res.json();
}

export const authApi = {
  login: async (correo: string, clave: string) => {
    const res = await request<{ token: string; usuario: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ correo, clave }),
    });
    return res;
  },
};

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
