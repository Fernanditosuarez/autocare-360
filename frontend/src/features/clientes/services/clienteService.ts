import { apiFetch } from '../../../api/apiClient';
import type { Cliente } from '../types/Cliente';
import type { ClienteFormData } from '../types/ClienteFormData';

export const clienteService = {
    // GET /api/clientes
    listar(signal?: AbortSignal): Promise<Cliente[]> {
        return apiFetch<Cliente[]>('/clientes', { signal });
    },

    // GET /api/clientes/{id}
    obtenerPorId(id: number, signal?: AbortSignal): Promise<Cliente> {
        return apiFetch<Cliente>(`/clientes/${id}`, { signal });
    },

    // POST /api/clientes
    crear(data: ClienteFormData): Promise<Cliente> {
        return apiFetch<Cliente>('/clientes', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    // PUT /api/clientes/{id}
    actualizar(id: number, data: ClienteFormData): Promise<Cliente> {
        return apiFetch<Cliente>(`/clientes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    // DELETE /api/clientes/{id}
    eliminar(id: number): Promise<void> {
        return apiFetch<void>(`/clientes/${id}`, {
            method: 'DELETE',
        });
    },
};