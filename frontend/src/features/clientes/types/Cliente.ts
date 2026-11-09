export interface Cliente {
    clienteId: number;
    nombreCompleto: string;
    documentoIdentidad: string;
    correoElectronico?: string;
    telefono?: string;
    direccion?: string;
}