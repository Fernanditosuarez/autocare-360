import type { VehiculoFormData } from '../types/VehiculoFormData';

export type VehiculoFormErrors = Partial<Record<keyof VehiculoFormData, string>>;

export function validarVehiculo(data: VehiculoFormData): VehiculoFormErrors {
    const errors: VehiculoFormErrors = {};

    if (!data.placa.trim()) {
        errors.placa = 'La placa es obligatoria.';
    }

    if (!data.tipo) {
        errors.tipo = 'Debe seleccionar un tipo de vehículo.';
    }

    if (!data.clienteId) {
        errors.clienteId = 'Debe seleccionar un cliente propietario.';
    }

    return errors;
}