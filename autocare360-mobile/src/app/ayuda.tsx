import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ReturnButton } from '../components/ReturnButton';
import { useParking } from '../state/ParkingContext';
import { PALETTE } from '../theme/palette';

export default function AyudaScreen() {
  const { clientes, vehiculos, cargando, error } = useParking();

  return (
    <ScrollView contentContainerStyle={styles.contenido}>
      <ReturnButton destinoSiNoHayHistorial="/" />
      <Text style={styles.etiqueta}>AUTO CARE 360 · PROYECTO MÓVIL FINAL</Text>
      <Text style={styles.titulo}>Resumen & Arquitectura</Text>
      <Text style={styles.descripcion}>
        Solución móvil integral desarrollada con React Native, Expo Router, TypeScript, SQLite, Cámara/Galería, Vitest, JWT y Spring Boot.
      </Text>

      <View style={styles.seccion}>
        <Text style={styles.subtitulo}>📱 Estado del Sistema</Text>
        <Text style={styles.texto}>• Clientes registrados: {clientes.length}</Text>
        <Text style={styles.texto}>• Vehículos registrados: {vehiculos.length}</Text>
        <Text style={styles.texto}>
          • Conexión HTTP: {cargando ? 'Cargando...' : error ? 'Modo Local (Sin backend)' : 'En línea (Spring Boot)'}
        </Text>
      </View>

      <View style={styles.seccion}>
        <Text style={styles.subtitulo}>🎯 15 Guías de Desarrollo Completadas</Text>
        <Text style={styles.texto}>✅ Guía 01: Entorno, Expo y primera pantalla</Text>
        <Text style={styles.texto}>✅ Guía 02: Componentes, props, estado y paleta</Text>
        <Text style={styles.texto}>✅ Guía 03: Navegación por archivos (Expo Router)</Text>
        <Text style={styles.texto}>✅ Guía 04: Formularios, entradas de datos y validaciones</Text>
        <Text style={styles.texto}>✅ Guía 05: Estado compartido y CRUD de Clientes</Text>
        <Text style={styles.texto}>✅ Guía 06: CRUD de Vehículos y relación 1:N</Text>
        <Text style={styles.texto}>✅ Guía 07: Conexión HTTP asíncrona con fetch y useEffect</Text>
        <Text style={styles.texto}>✅ Guía 08: Persistencia REST completa (POST, PUT, DELETE)</Text>
        <Text style={styles.texto}>✅ Guía 09: Búsqueda en tiempo real, filtros y FlatList</Text>
        <Text style={styles.texto}>✅ Guía 10: Integración final, modales y Dashboard</Text>
        <Text style={styles.texto}>✅ Guía 11: Autenticación JWT y SecureStore</Text>
        <Text style={styles.texto}>✅ Guía 12: SQLite, caché local y trabajo sin conexión</Text>
        <Text style={styles.texto}>✅ Guía 13: Cámara, galería, permisos nativos y subida de fotos</Text>
        <Text style={styles.texto}>✅ Guía 14: Pruebas unitarias con Vitest, TypeScript y Expo Doctor</Text>
        <Text style={styles.texto}>✅ Guía 15: Perfiles de compilación EAS (APK/AAB) y graduación</Text>
      </View>

      <Text style={styles.pie}>AutoCare 360 · Solución Móvil Profesional 2026</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 18, paddingBottom: 40 },
  etiqueta: { fontSize: 11, fontWeight: '800', color: PALETTE.acento, letterSpacing: 1 },
  titulo: { fontSize: 25, fontWeight: '800', color: PALETTE.principal, marginTop: 4 },
  descripcion: { fontSize: 14, color: PALETTE.secundario, marginTop: 6, marginBottom: 20, lineHeight: 20 },
  seccion: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: PALETTE.borde,
    marginBottom: 16,
  },
  subtitulo: { fontSize: 16, fontWeight: '800', color: PALETTE.principal, marginBottom: 10 },
  texto: { fontSize: 13, color: PALETTE.secundario, marginBottom: 6, lineHeight: 18 },
  pie: { textAlign: 'center', color: PALETTE.acento, marginTop: 20, fontSize: 12, fontWeight: '700' },
});
