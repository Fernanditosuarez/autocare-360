import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Vehiculo } from '../models/parking';
import { PALETTE } from '../theme/palette';

type Props = {
  vehiculo: Vehiculo;
  nombreCliente: string;
};

export function VehiculoCard({ vehiculo, nombreCliente }: Props) {
  return (
    <View style={styles.tarjeta}>
      <Text style={styles.placa}>{vehiculo.placa}</Text>
      <Text style={styles.detalle}>
        {vehiculo.marca} {vehiculo.modelo}
      </Text>
      <Text style={styles.propietario}>Propietario: {nombreCliente}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: PALETTE.superficie,
    borderColor: PALETTE.borde,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  placa: {
    fontSize: 17,
    fontWeight: '800',
    color: PALETTE.principal,
  },
  detalle: {
    fontSize: 14,
    color: PALETTE.secundario,
    marginTop: 4,
  },
  propietario: {
    fontSize: 13,
    fontWeight: '600',
    color: PALETTE.acento,
    marginTop: 6,
  },
});
