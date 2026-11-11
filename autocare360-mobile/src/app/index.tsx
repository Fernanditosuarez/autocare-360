import React from 'react';
import { Link } from 'expo-router';
import { ScrollView, Pressable, StyleSheet, Text, View } from 'react-native';
import { MetricCard } from '../components/MetricCard';
import { useParking } from '../state/ParkingContext';
import { PALETTE } from '../theme/palette';

export default function InicioScreen() {
  const { clientes, vehiculos } = useParking();

  return (
    <ScrollView contentContainerStyle={styles.contenido}>
      <Text style={styles.etiqueta}>PROGRAMACIÓN APLICADA · GUÍA 05</Text>
      <Text style={styles.titulo}>AutoCare 360 Mobile</Text>
      <Text style={styles.descripcion}>
        Estado compartido local y CRUD en memoria con React Context API y Reducer.
      </Text>

      <View style={styles.metricas}>
        <MetricCard etiqueta="Clientes" valor={clientes.length} />
        <MetricCard etiqueta="Vehículos" valor={vehiculos.length} />
      </View>

      <Text style={styles.subtitulo}>¿Dónde quieres entrar?</Text>

      <Link href="/clientes" asChild>
        <Pressable style={styles.boton} accessibilityRole="link">
          <Text style={styles.botonTitulo}>Explorar Clientes →</Text>
          <Text style={styles.botonSub}>Gestionar alta, edición y baja de clientes</Text>
        </Pressable>
      </Link>

      <Link href="/vehiculos" asChild>
        <Pressable style={styles.boton} accessibilityRole="link">
          <Text style={styles.botonTitulo}>Explorar Vehículos →</Text>
          <Text style={styles.botonSub}>Consultar catálogo de vehículos del taller</Text>
        </Pressable>
      </Link>

      <Link href="/ayuda" asChild>
        <Pressable style={styles.botonSuave} accessibilityRole="link">
          <Text style={styles.botonTitulo}>Acerca de esta guía</Text>
        </Pressable>
      </Link>

      <Text style={styles.aviso}>
        Los cambios en la interfaz se conservan en memoria mientras la app siga activa.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 20, paddingBottom: 40 },
  etiqueta: { fontSize: 11, fontWeight: '800', color: PALETTE.acento, letterSpacing: 1 },
  titulo: { fontSize: 28, fontWeight: '800', color: PALETTE.principal, marginTop: 4 },
  descripcion: { fontSize: 14, color: PALETTE.secundario, marginTop: 4, marginBottom: 20 },
  metricas: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  subtitulo: { fontSize: 16, fontWeight: '700', color: PALETTE.principal, marginBottom: 12 },
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
  aviso: { textAlign: 'center', fontSize: 12, color: PALETTE.secundario, marginTop: 24 },
});
