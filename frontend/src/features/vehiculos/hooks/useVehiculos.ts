import { useAsyncList } from '../../../hooks/useAsyncList';
import type { Vehiculo } from '../types/Vehiculo';
import { vehiculoService } from '../services/vehiculoService';

export function useVehiculos() {
    return useAsyncList<Vehiculo>(vehiculoService.listar);
}