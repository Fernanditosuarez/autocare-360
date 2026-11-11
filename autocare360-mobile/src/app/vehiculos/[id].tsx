import React from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../../components/EmptyState';
import { ReturnButton } from '../../components/ReturnButton';
import { CLIENTES, VEHICULOS } from '../../data/demoData';
import { PALETTE } from '../../theme/palette';
import { leerIdPositivo } from '../../utils/routeParams';

export default function DetalleVehiculoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const vehiculoId = leerIdPositivo(id);
  const vehiculo = VEHICULOS.find((v) => v.id === vehiculoId);

  if (!vehiculo) {
    return (
      <View style={styles.contenido}>
        <EmptyState mensaje="No se encontró el vehículo solicitado o su ID de ruta no es válido." />
        <Link href="/vehiculos" asChild>
          <Pressable style={styles.accion} accessibilityRole="link">
            <Text style={styles.accionTexto}>Volver a la lista de vehículos</Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  const cliente = CLIENTES.find((c) => c.id === vehiculo.clienteId);

  return (
    <ScrollView contentContainerStyle={styles.contenido}>
      <ReturnButton destinoSiNoHayHistorial="/vehiculos" />
      <Text style={styles.etiqueta}>VEHÍCULO N.º {vehiculo.id}</Text>
      <Text style={styles.titulo}>{vehiculo.placa}</Text>
      <Text style={styles.dato}>Marca: {vehiculo.marca}</Text>
      <Text style={styles.dato}>Modelo: {vehiculo.modelo}</Text>

      <Text style={styles.subtitulo}>Propietario asignado</Text>
      <Text style={styles.dato}>{cliente?.nombre ?? 'Cliente no encontrado'}</Text>

      {cliente ? (
        <Link
          href={{ pathname: '/clientes/[id]', params: { id: String(cliente.id) } }}
          asChild
        >
          <Pressable style={styles.accion} accessibilityRole="link">
            <Text style={styles.accionTexto}>Ver ficha de {cliente.nombre} →</Text>
          </Pressable>
        </Link>
      ) : (
        <EmptyState mensaje="Este vehículo no tiene un cliente válido en datos locales." />
      )}

      <Text style={styles.pie}>Navegación declarativa por parámetros dinámicos</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 18, paddingBottom: 40 },
  etiqueta: { color: PALETTE.acento, fontWeight: '800', marginTop: 6, fontSize: 12 },
  titulo: { marginTop: 4, fontSize: 28, color: PALETTE.principal, fontWeight: '800' },
  subtitulo: { fontSize: 18, fontWeight: '800', marginTop: 24, marginBottom: 8, color: PALETTE.principal },
  dato: { marginTop: 6, color: PALETTE.secundario, fontSize: 14 },
  accion: { marginTop: 16, backgroundColor: PALETTE.acentoClaro, padding: 14, borderRadius: 12 },
  accionTexto: { color: PALETTE.principal, fontWeight: '700', textAlign: 'center' },
  pie: { marginTop: 28, textAlign: 'center', color: PALETTE.secundario, fontSize: 12 },
});
