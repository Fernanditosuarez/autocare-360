import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PALETTE } from '../theme/palette';

type Props = {
  etiqueta: string;
  valor: number;
};

export function MetricCard({ etiqueta, valor }: Props) {
  return (
    <View style={styles.tarjeta}>
      <Text style={styles.valor}>{valor}</Text>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flex: 1,
    backgroundColor: PALETTE.superficie,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: PALETTE.borde,
    alignItems: 'center',
  },
  valor: {
    fontSize: 28,
    fontWeight: '800',
    color: PALETTE.principal,
  },
  etiqueta: {
    fontSize: 12,
    color: PALETTE.secundario,
    marginTop: 4,
    fontWeight: '500',
  },
});
