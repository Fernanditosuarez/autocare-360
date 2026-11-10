import type { ClienteFormData } from '../types/ClienteFormData';

export type ClienteFormErrors = Partial<Record<keyof ClienteFormData, string>>;

export function validarCliente(data: ClienteFormData): ClienteFormErrors {
    const errors: ClienteFormErrors = {};

    if (!data.nombreCompleto.trim()) {
        errors.nombreCompleto = 'El nombre completo es obligatorio.';
    }

    if (!data.documentoIdentidad.trim()) {
        errors.documentoIdentidad = 'El documento de identidad es obligatorio.';
    } else if (data.documentoIdentidad.trim().length < 5) {
        errors.documentoIdentidad = 'El documento debe tener al menos 5 caracteres.';
    }

    if (data.correoElectronico && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correoElectronico)) {
        errors.correoElectronico = 'Ingrese un correo electrónico válido.';
    }

    if (data.telefono && data.telefono.replace(/\D/g, '').length < 7) {
        errors.telefono = 'El teléfono debe contener al menos 7 dígitos.';
    }

    return errors;
}