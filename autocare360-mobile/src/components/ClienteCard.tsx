import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Cliente } from '../models/parking';
import { PALETTE } from '../theme/palette';

type Props = {
  cliente: Cliente;
  cantidadVehiculos: number;
  seleccionado: boolean;
  alSeleccionar: () => void;
};

export function ClienteCard({
  cliente,
  cantidadVehiculos,
  seleccionado,
  alSeleccionar,
}: Props) {
  return (
    <Pressable
      onPress={alSeleccionar}
      accessibilityRole="button"
      accessibilityLabel={`Ver vehículos de ${cliente.nombre}`}
      accessibilityState={{ selected: seleccionado }}
      style={[styles.tarjeta, seleccionado && styles.tarjetaSeleccionada]}
    >
      <View style={styles.fila}>
        <Text style={styles.nombre}>{cliente.nombre}</Text>
        <Text style={[styles.estado, !cliente.activo && styles.inactivo]}>
          {cliente.activo ? 'ACTIVO' : 'INACTIVO'}
        </Text>
      </View>
      <Text style={styles.detalle}>{cliente.correo}</Text>
      <Text style={styles.detalle}>
        {cantidadVehiculos} vehículo(s) registrado(s)
      </Text>
      <Text style={styles.accion}>
        {seleccionado ? '✓ Cliente seleccionado' : '👉 Tocar para ver vehículos'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: PALETTE.superficie,
    borderWidth: 1,
    borderColor: PALETTE.borde,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  tarjetaSeleccionada: {
    borderColor: PALETTE.acento,
    borderWidth: 2,
    backgroundColor: PALETTE.acentoClaro,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  nombre: {
    fontSize: 16,
    fontWeight: '700',
    color: PALETTE.principal,
  },
  estado: {
    fontSize: 11,
    fontWeight: '800',
    color: PALETTE.exito,
  },
  inactivo: {
    color: PALETTE.peligro,
  },
  detalle: {
    fontSize: 13,
    color: PALETTE.secundario,
    marginTop: 2,
  },
  accion: {
    fontSize: 12,
    fontWeight: '700',
    color: PALETTE.acento,
    marginTop: 10,
  },
});
