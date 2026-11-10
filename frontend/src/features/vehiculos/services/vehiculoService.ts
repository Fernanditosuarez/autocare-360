import { apiFetch } from '../../../api/apiClient';
import type { Vehiculo } from '../types/Vehiculo';
import type { VehiculoFormData } from '../types/VehiculoFormData';

export interface VehiculoPayload {
    placa: string;
    tipo: string;
    marca?: string;
    modelo?: string;
    color?: string;
    clienteId: number;
}

export const vehiculoService = {
    // GET /api/vehiculos
    listar(signal?: AbortSignal): Promise<Vehiculo[]> {
        return apiFetch<Vehiculo[]>('/vehiculos', { signal });
    },

    // GET /api/vehiculos/{id}
    obtenerPorId(id: number, signal?: AbortSignal): Promise<Vehiculo> {
        return apiFetch<Vehiculo>(`/vehiculos/${id}`, { signal });
    },

    // POST /api/vehiculos
    crear(data: VehiculoPayload): Promise<Vehiculo> {
        return apiFetch<Vehiculo>('/vehiculos', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    // PUT /api/vehiculos/{id}
    actualizar(id: number, data: VehiculoPayload): Promise<Vehiculo> {
        return apiFetch<Vehiculo>(`/vehiculos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    // DELETE /api/vehiculos/{id}
    eliminar(id: number): Promise<void> {
        return apiFetch<void>(`/vehiculos/${id}`, {
            method: 'DELETE',
        });
    },
};