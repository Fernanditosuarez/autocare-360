import { describe, expect, it } from 'vitest';

export function validarCorreo(correo: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
}

export function validarPlaca(placa: string): boolean {
  return /^[A-Z0-9-]{3,10}$/i.test(placa.trim());
}

export function calcularMétricasVehículos(numClientes: number, numVehiculos: number): number {
  if (numClientes <= 0) return 0;
  return Number((numVehiculos / numClientes).toFixed(1));
}

describe('Pruebas Unitarias de Dominio — AutoCare 360 (Guía 14)', () => {
  it('debe validar correos electrónicos válidos e inválidos', () => {
    expect(validarCorreo('profesor@autocare360.com')).toBe(true);
    expect(validarCorreo('usuario@dominio.com')).toBe(true);
    expect(validarCorreo('correo-invalido')).toBe(false);
    expect(validarCorreo('')).toBe(false);
  });

  it('debe validar formatos de placa de vehículos', () => {
    expect(validarPlaca('SCZ-1234')).toBe(true);
    expect(validarPlaca('ABC-999')).toBe(true);
    expect(validarPlaca('')).toBe(false);
  });

  it('debe calcular correctamente el promedio de vehículos por cliente', () => {
    expect(calcularMétricasVehículos(2, 4)).toBe(2.0);
    expect(calcularMétricasVehículos(3, 5)).toBe(1.7);
    expect(calcularMétricasVehículos(0, 5)).toBe(0);
  });
});
