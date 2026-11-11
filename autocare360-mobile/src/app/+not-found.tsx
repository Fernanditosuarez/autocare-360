import React from 'react';
import { Link, Stack } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PALETTE } from '../theme/palette';

export default function RutaNoEncontradaScreen() {
  return (
    <View style={styles.contenido}>
      <Stack.Screen options={{ title: 'Ruta no encontrada' }} />
      <Text style={styles.titulo}>Pantalla desconocida (404)</Text>
      <Text style={styles.detalle}>
        La dirección solicitada no corresponde a ninguna pantalla registrada en la aplicación.
      </Text>
      <Link href="/" asChild>
        <Pressable style={styles.accion} accessibilityRole="link">
          <Text style={styles.accionTexto}>Volver al Inicio</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  contenido: { flex: 1, padding: 22, justifyContent: 'center' },
  titulo: { fontSize: 23, fontWeight: '800', color: PALETTE.principal },
  detalle: { marginTop: 12, lineHeight: 22, color: PALETTE.secundario, fontSize: 14 },
  accion: { marginTop: 22, padding: 16, borderRadius: 12, backgroundColor: PALETTE.acentoClaro },
  accionTexto: { fontWeight: '700', color: PALETTE.principal, textAlign: 'center' },
});
