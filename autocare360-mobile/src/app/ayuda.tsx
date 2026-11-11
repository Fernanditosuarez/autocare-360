import React from 'react';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { ReturnButton } from '../components/ReturnButton';
import { PALETTE } from '../theme/palette';

export default function AyudaScreen() {
  return (
    <ScrollView contentContainerStyle={styles.contenido}>
      <ReturnButton destinoSiNoHayHistorial="/" />
      <Text style={styles.titulo}>Acerca de la Guía 03</Text>
      <Text style={styles.parrafo}>
        En esta práctica transformamos la interfaz monolítica en un sistema de navegación
        basado en archivos con Expo Router. Cada pantalla corresponde a un archivo en src/app/.
      </Text>

      <Text style={styles.subtitulo}>Pruebas de rutas y manejo de errores</Text>
      <Text style={styles.parrafo}>
        Toca los botones para probar el comportamiento defensivo ante IDs inexistentes o mal formados:
      </Text>

      <Link href={{ pathname: '/clientes/[id]', params: { id: '999' } }} asChild>
        <Pressable style={styles.accion} accessibilityRole="link">
          <Text style={styles.accionTexto}>🧪 Probar Cliente 999 (ID inexistente)</Text>
        </Pressable>
      </Link>

      <Link href={{ pathname: '/vehiculos/[id]', params: { id: 'abc' } }} asChild>
        <Pressable style={styles.accion} accessibilityRole="link">
          <Text style={styles.accionTexto}>🧪 Probar Vehículo con ID inválido ("abc")</Text>
        </Pressable>
      </Link>

      <Text style={styles.nota}>
        Si los IDs no existen o no son numéricos, la app muestra un estado defensivo sin romperse.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 18, paddingBottom: 40 },
  titulo: { marginTop: 8, fontSize: 23, fontWeight: '800', color: PALETTE.principal },
  subtitulo: { marginTop: 20, fontSize: 16, fontWeight: '800', color: PALETTE.principal },
  parrafo: { marginTop: 8, lineHeight: 22, color: PALETTE.secundario, fontSize: 14 },
  accion: { backgroundColor: PALETTE.acentoClaro, borderRadius: 12, padding: 14, marginTop: 12 },
  accionTexto: { textAlign: 'center', fontWeight: '700', color: PALETTE.principal },
  nota: { marginTop: 18, lineHeight: 20, color: PALETTE.acento, fontSize: 12 },
});
