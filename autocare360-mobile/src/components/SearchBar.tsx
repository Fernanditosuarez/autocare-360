import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { PALETTE } from '../theme/palette';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export function SearchBar({ value, onChangeText, placeholder = 'Buscar...' }: Props) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.icono}>🔍</Text>
      <TextInput
        style={styles.entrada}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={PALETTE.secundario}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText('')} style={styles.botonLimpiar}>
          <Text style={styles.textoLimpiar}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: PALETTE.borde,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  icono: { fontSize: 14, marginRight: 8 },
  entrada: { flex: 1, height: 44, color: PALETTE.principal, fontSize: 14 },
  botonLimpiar: { padding: 4 },
  textoLimpiar: { color: PALETTE.secundario, fontWeight: '700', fontSize: 14 },
});
