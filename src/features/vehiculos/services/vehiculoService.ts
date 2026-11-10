import { apiFetch } from '../../../api/apiClient';
import type { Vehiculo } from '../types/Vehiculo';

export interface VehiculoPayload {
    placa: string;
    tipo: string;
    marca?: string;
    modelo?: string;
    color?: string;
    clienteId: number;
}

export const vehiculoService = {
    listar(signal?: AbortSignal): Promise<Vehiculo[]> {
        return apiFetch<Vehiculo[]>('/vehiculos', { signal });
    },

    crear(data: VehiculoPayload): Promise<Vehiculo> {
        return apiFetch<Vehiculo>('/vehiculos', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },
};