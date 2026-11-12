import React from 'react';
import { Link } from 'expo-router';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MetricCard } from '../components/MetricCard';
import { useParking } from '../state/ParkingContext';
import { PALETTE } from '../theme/palette';

export default function InicioScreen() {
  const { clientes, vehiculos, cargando, error, sincronizarConBackend } = useParking();

  const clientesActivos = clientes.filter((c) => c.activo).length;
  const promedioVehiculos = clientes.length > 0 ? (vehiculos.length / clientes.length).toFixed(1) : '0';

  return (
    <ScrollView contentContainerStyle={styles.contenido}>
      <Text style={styles.etiqueta}>PROGRAMACIÓN APLICADA · GUÍA 10 FINAL</Text>
      <Text style={styles.titulo}>AutoCare 360 Mobile</Text>
      <Text style={styles.descripcion}>
        Dashboard ejecutivo, estado en tiempo real e integración Fullstack con Spring Boot + PostgreSQL.
      </Text>

      {/* Banner de Estado de Red / Servidor */}
      {cargando ? (
        <View style={styles.bannerCarga}>
          <ActivityIndicator size="small" color={PALETTE.acento} />
          <Text style={styles.textoCarga}>Conectando con backend Spring Boot...</Text>
        </View>
      ) : error ? (
        <View style={styles.bannerError}>
          <Text style={styles.textoError}>⚠️ {error}</Text>
          <Pressable onPress={sincronizarConBackend} style={styles.botonReintentar}>
            <Text style={styles.textoReintentar}>🔄 Reintentar conexión</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.bannerExito}>
          <Text style={styles.textoExito}>🟢 Conectado con Spring Boot (http://10.0.2.2:8080/api)</Text>
        </View>
      )}

      {/* Métricas del Dashboard */}
      <Text style={styles.subtitulo}>📊 Dashboard de Métricas</Text>
      <View style={styles.metricasGrid}>
        <MetricCard etiqueta="Clientes Totales" valor={clientes.length} />
        <MetricCard etiqueta="Clientes Activos" valor={clientesActivos} />
        <MetricCard etiqueta="Vehículos Registrados" valor={vehiculos.length} />
        <MetricCard etiqueta="Promedio Vehículos/Cliente" valor={promedioVehiculos} />
      </View>

      <Text style={styles.subtitulo}>🚀 Módulos del Sistema</Text>

      <Link href="/clientes" asChild>
        <Pressable style={styles.boton} accessibilityRole="link">
          <Text style={styles.botonTitulo}>👥 Gestión de Clientes →</Text>
          <Text style={styles.botonSub}>Alta, edición, baja, búsqueda y filtros por estado</Text>
        </Pressable>
      </Link>

      <Link href="/vehiculos" asChild>
        <Pressable style={styles.boton} accessibilityRole="link">
          <Text style={styles.botonTitulo}>🚘 Catálogo de Vehículos →</Text>
          <Text style={styles.botonSub}>Registro de automotores, propietario 1:N y filtros</Text>
        </Pressable>
      </Link>

      <Link href="/ayuda" asChild>
        <Pressable style={styles.botonSuave} accessibilityRole="link">
          <Text style={styles.botonTitulo}>ℹ️ Acerca de la App & Arquitectura</Text>
        </Pressable>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 20, paddingBottom: 40 },
  etiqueta: { fontSize: 11, fontWeight: '800', color: PALETTE.acento, letterSpacing: 1 },
  titulo: { fontSize: 28, fontWeight: '800', color: PALETTE.principal, marginTop: 4 },
  descripcion: { fontSize: 14, color: PALETTE.secundario, marginTop: 4, marginBottom: 16 },
  bannerCarga: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: PALETTE.acentoClaro,
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  textoCarga: { color: PALETTE.acento, fontWeight: '700', fontSize: 13 },
  bannerError: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FCA5A5',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  textoError: { color: PALETTE.peligro, fontWeight: '600', fontSize: 12 },
  botonReintentar: { marginTop: 8, alignSelf: 'flex-start' },
  textoReintentar: { color: PALETTE.acento, fontWeight: '700', fontSize: 12 },
  bannerExito: {
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  textoExito: { color: PALETTE.exito, fontWeight: '700', fontSize: 12 },
  subtitulo: { fontSize: 16, fontWeight: '700', color: PALETTE.principal, marginTop: 8, marginBottom: 12 },
  metricasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: PALETTE.superficie,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: PALETTE.borde,
    marginBottom: 12,
  },
  botonSuave: {
    backgroundColor: PALETTE.acentoClaro,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  botonTitulo: { fontSize: 16, fontWeight: '700', color: PALETTE.principal },
  botonSub: { fontSize: 12, color: PALETTE.secundario, marginTop: 4 },
});
