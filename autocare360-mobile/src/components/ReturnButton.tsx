import React from 'react';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { PALETTE } from '../theme/palette';

type Destino = '/' | '/clientes' | '/vehiculos';
type Props = { destinoSiNoHayHistorial: Destino };

export function ReturnButton({ destinoSiNoHayHistorial }: Props) {
  const router = useRouter();

  function regresar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(destinoSiNoHayHistorial);
    }
  }

  return (
    <Pressable
      onPress={regresar}
      style={styles.boton}
      accessibilityRole="button"
      accessibilityLabel="Regresar a la pantalla anterior"
    >
      <Text style={styles.texto}>← Volver</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: { alignSelf: 'flex-start', paddingVertical: 12, paddingRight: 14 },
  texto: { color: PALETTE.acento, fontSize: 15, fontWeight: '700' },
});
