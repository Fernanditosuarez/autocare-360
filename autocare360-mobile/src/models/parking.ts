export type Seccion = 'clientes' | 'vehiculos';

export type Cliente = Readonly<{
  id: number;
  nombre: string;
  correo: string;
  activo: boolean;
}>;

export type Vehiculo = Readonly<{
  id: number;
  clienteId: number;
  placa: string;
  marca: string;
  modelo: string;
}>;
