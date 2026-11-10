import type { VehiculoFormData } from '../types/VehiculoFormData';

export interface VehiculoFormErrors {
    placa?: string;
    tipo?: string;
    clienteId?: string;
}

export function validarVehiculo(data: VehiculoFormData): VehiculoFormErrors {
    const errors: VehiculoFormErrors = {};

    if (!data.placa.trim()) {
        errors.placa = 'La placa es obligatoria';
    }

    if (!data.tipo) {
        errors.tipo = 'Debe seleccionar un tipo de vehículo';
    }

    if (!data.clienteId) {
        errors.clienteId = 'Debe seleccionar un cliente propietario';
    }

    return errors;
}