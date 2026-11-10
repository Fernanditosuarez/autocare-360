export type TipoVehiculo = 'AUTO' | 'MOTO' | 'CAMIONETA' | 'SUV';

export interface Vehiculo {
    vehiculoId: number;
    placa: string;
    tipo: TipoVehiculo;
    marca?: string;
    modelo?: string;
    color?: string;
    clienteId: number;
    nombreCliente?: string;
}