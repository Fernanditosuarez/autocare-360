import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Seccion } from '../models/parking';
import { PALETTE } from '../theme/palette';

type Props = {
  actual: Seccion;
  alCambiar: (nuevaSeccion: Seccion) => void;
};

const OPCIONES: { clave: Seccion; etiqueta: string }[] = [
  { clave: 'clientes', etiqueta: 'Clientes' },
  { clave: 'vehiculos', etiqueta: 'Vehículos' },
];

export function TabSelector({ actual, alCambiar }: Props) {
  return (
    <View style={styles.fila}>
      {OPCIONES.map((opcion) => {
        const elegida = actual === opcion.clave;
        return (
          <Pressable
            key={opcion.clave}
            onPress={() => alCambiar(opcion.clave)}
            accessibilityRole="button"
            accessibilityLabel={`Mostrar ${opcion.etiqueta}`}
            accessibilityState={{ selected: elegida }}
            style={[styles.boton, elegida && styles.botonElegido]}
          >
            <Text style={[styles.texto, elegida && styles.textoElegido]}>
              {opcion.etiqueta}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  boton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: PALETTE.borde,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonElegido: {
    backgroundColor: PALETTE.acento,
  },
  texto: {
    fontSize: 14,
    fontWeight: '700',
    color: PALETTE.secundario,
  },
  textoElegido: {
    color: PALETTE.superficie,
  },
});
