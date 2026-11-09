export interface Vehiculo {
    vehiculoId: number;
    clienteId: number;
    placa: string;
    tipo: 'AUTO' | 'MOTO' | 'CAMIONETA' | 'SUV';
    marca?: string;
    modelo?: string;
    color?: string;
}