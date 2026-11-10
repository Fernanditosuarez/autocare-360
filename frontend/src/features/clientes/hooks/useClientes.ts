import { useAsyncList } from '../../../hooks/useAsyncList';
import type { Cliente } from '../types/Cliente';
import { clienteService } from '../services/clienteService';

export function useClientes() {
    return useAsyncList<Cliente>(clienteService.listar);
}