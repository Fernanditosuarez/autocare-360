import React from 'react';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../../components/EmptyState';
import { ReturnButton } from '../../components/ReturnButton';
import { useParking } from '../../state/ParkingContext';
import { PALETTE } from '../../theme/palette';
import { leerIdPositivo } from '../../utils/routeParams';

export default function DetalleVehiculoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { clientes, vehiculos, dispatch } = useParking();
  const vehiculoId = leerIdPositivo(id);
  const vehiculo = vehiculos.find((v) => v.id === vehiculoId);

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

  const cliente = clientes.find((c) => c.id === vehiculo.clienteId);

  function confirmarEliminacion() {
    if (!vehiculo) return;
    Alert.alert(
      'Eliminar vehículo',
      `¿Estás seguro de eliminar el vehículo con placa ${vehiculo.placa}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            dispatch({ type: 'VEHICULO_ELIMINAR', payload: vehiculo.id });
            router.replace('/vehiculos');
          },
        },
      ]
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.contenido}>
      <ReturnButton destinoSiNoHayHistorial="/vehiculos" />
      <Text style={styles.etiqueta}>VEHÍCULO N.º {vehiculo.id}</Text>
      <Text style={styles.titulo}>{vehiculo.placa}</Text>
      <Text style={styles.dato}>Marca: {vehiculo.marca}</Text>
      <Text style={styles.dato}>Modelo: {vehiculo.modelo}</Text>

      <Text style={styles.subtitulo}>Propietario asignado</Text>
      <Text style={styles.dato}>{cliente?.nombre ?? 'Cliente no encontrado'}</Text>

      {/* Botones de Edición y Eliminación */}
      <View style={styles.filaAcciones}>
        <Link
          href={{
            pathname: '/vehiculos/editar/[id]',
            params: { id: String(vehiculo.id) },
          }}
          asChild
        >
          <Pressable style={styles.botonEditar} accessibilityRole="button">
            <Text style={styles.textoBoton}>✏️ Editar vehículo</Text>
          </Pressable>
        </Link>

        <Pressable
          style={styles.botonEliminar}
          onPress={confirmarEliminacion}
          accessibilityRole="button"
        >
          <Text style={styles.textoBotonBlanco}>🗑️ Eliminar</Text>
        </Pressable>
      </View>

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
        <EmptyState mensaje="Este vehículo no tiene un cliente válido asignado." />
      )}

      <Text style={styles.pie}>Gestión de Vehículos con Context API y Reducer</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 18, paddingBottom: 40 },
  etiqueta: { color: PALETTE.acento, fontWeight: '800', marginTop: 6, fontSize: 12 },
  titulo: { marginTop: 4, fontSize: 28, color: PALETTE.principal, fontWeight: '800' },
  subtitulo: { fontSize: 18, fontWeight: '800', marginTop: 20, marginBottom: 4, color: PALETTE.principal },
  dato: { marginTop: 4, color: PALETTE.secundario, fontSize: 14 },
  filaAcciones: { flexDirection: 'row', gap: 10, marginTop: 16 },
  botonEditar: {
    flex: 1,
    backgroundColor: PALETTE.acentoClaro,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonEliminar: {
    backgroundColor: PALETTE.peligro,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  textoBoton: { color: PALETTE.principal, fontWeight: '700', fontSize: 13 },
  textoBotonBlanco: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  accion: { marginTop: 16, backgroundColor: PALETTE.acentoClaro, padding: 14, borderRadius: 12 },
  accionTexto: { color: PALETTE.principal, fontWeight: '700', textAlign: 'center' },
  pie: { marginTop: 28, textAlign: 'center', color: PALETTE.secundario, fontSize: 12 },
});
