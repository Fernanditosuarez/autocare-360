import type { Cliente, Vehiculo } from '../models/parking';

export const CLIENTES: readonly Cliente[] = [
  { id: 1, nombre: 'Ana Rojas', correo: 'ana.rojas@email.com', activo: true },
  { id: 2, nombre: 'Luis Pérez', correo: 'luis.perez@email.com', activo: true },
  { id: 3, nombre: 'Marta Gómez', correo: 'marta.gomez@email.com', activo: false },
  { id: 4, nombre: 'Diego Ruiz', correo: 'diego.ruiz@email.com', activo: true },
];

export const VEHICULOS: readonly Vehiculo[] = [
  { id: 101, clienteId: 1, placa: 'SCZ-1234', marca: 'Toyota', modelo: 'Corolla' },
  { id: 102, clienteId: 1, placa: 'SCZ-5678', marca: 'Honda', modelo: 'Civic' },
  { id: 103, clienteId: 2, placa: 'SCZ-9012', marca: 'Nissan', modelo: 'Sentra' },
  { id: 104, clienteId: 3, placa: 'SCZ-3456', marca: 'Suzuki', modelo: 'Vitara' },
  { id: 105, clienteId: 3, placa: 'SCZ-7890', marca: 'Hyundai', modelo: 'Tucson' },
];
