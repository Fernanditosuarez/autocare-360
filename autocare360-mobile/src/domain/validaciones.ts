export type VehiculoFormValue = {
  clienteId: number | null;
  placa: string;
  marca: string;
  modelo: string;
};

export type VehiculoFormErrores = Partial<Record<keyof VehiculoFormValue, string>>;

export const normalizarPlaca = (placa: string): string => placa.trim().toUpperCase();

export function validarVehiculo(
  entrada: VehiculoFormValue,
  idsClientes: readonly number[]
): VehiculoFormErrores {
  const errores: VehiculoFormErrores = {};
  if (entrada.clienteId === null || !idsClientes.includes(entrada.clienteId)) {
    errores.clienteId = 'Selecciona un cliente de la lista.';
  }
  if (!/^[A-Z]{2,4}-\d{3,5}$/.test(normalizarPlaca(entrada.placa))) {
    errores.placa = 'Ejemplo válido para esta práctica: SCZ-1234.';
  }
  if (entrada.marca.trim().length < 2) {
    errores.marca = 'La marca debe contener al menos 2 caracteres.';
  }
  if (entrada.modelo.trim().length < 2) {
    errores.modelo = 'El modelo debe contener al menos 2 caracteres.';
  }
  return errores;
}

export type ClienteFormValue = { nombre: string; correo: string; activo: boolean };
export type ClienteFormErrores = Partial<Record<'nombre' | 'correo', string>>;

export function validarCliente(entrada: ClienteFormValue): ClienteFormErrores {
  const errores: ClienteFormErrores = {};
  if (entrada.nombre.trim().length < 3) errores.nombre = 'Mínimo 3 caracteres.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entrada.correo.trim())) {
    errores.correo = 'Escribe un correo con formato nombre@dominio.com.';
  }
  return errores;
}
