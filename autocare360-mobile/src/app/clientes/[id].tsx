import React from 'react';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../../components/EmptyState';
import { ReturnButton } from '../../components/ReturnButton';
import { VehiculoNavegable } from '../../components/VehiculoNavegable';
import { useParking } from '../../state/ParkingContext';
import { PALETTE } from '../../theme/palette';
import { leerIdPositivo } from '../../utils/routeParams';

export default function DetalleClienteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { clientes, vehiculos, dispatch } = useParking();
  const clienteId = leerIdPositivo(id);
  const cliente = clientes.find((c) => c.id === clienteId);

  if (!cliente) {
    return (
      <View style={styles.contenido}>
        <EmptyState mensaje="No se encontró el cliente solicitado o su ID de ruta no es válido." />
        <Link href="/clientes" asChild>
          <Pressable style={styles.accion} accessibilityRole="link">
            <Text style={styles.accionTexto}>Volver a la lista de clientes</Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  const vehiculosAsociados = vehiculos.filter((v) => v.clienteId === cliente.id);

  function confirmarEliminacion() {
    if (!cliente) return;
    Alert.alert(
      'Eliminar cliente',
      `¿Estás seguro de eliminar a ${cliente.nombre}? También se eliminarán sus vehículos asociados.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            dispatch({ type: 'CLIENTE_ELIMINAR', payload: cliente.id });
            router.replace('/clientes');
          },
        },
      ]
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.contenido}>
      <ReturnButton destinoSiNoHayHistorial="/clientes" />
      <Text style={styles.etiqueta}>CLIENTE N.º {cliente.id}</Text>
      <Text style={styles.titulo}>{cliente.nombre}</Text>
      <Text style={styles.dato}>Correo: {cliente.correo}</Text>
      <Text style={styles.dato}>
        Estado: {cliente.activo ? 'ACTIVO' : 'INACTIVO'}
      </Text>

      {/* Botones de Edición y Eliminación */}
      <View style={styles.filaAcciones}>
        <Link
          href={{
            pathname: '/clientes/editar/[id]',
            params: { id: String(cliente.id) },
          }}
          asChild
        >
          <Pressable style={styles.botonEditar} accessibilityRole="button">
            <Text style={styles.textoBoton}>✏️ Editar cliente</Text>
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

      <Text style={styles.subtitulo}>
        Vehículos asociados ({vehiculosAsociados.length})
      </Text>

      {vehiculosAsociados.length === 0 ? (
        <EmptyState mensaje="Este cliente no tiene vehículos de prueba registrados." />
      ) : (
        vehiculosAsociados.map((v) => (
          <VehiculoNavegable
            key={v.id}
            vehiculo={v}
            nombreCliente={cliente.nombre}
          />
        ))
      )}

      <Text style={styles.pie}>Relación Cliente (1) — (N) Vehículo con Context API</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 18, paddingBottom: 40 },
  etiqueta: { color: PALETTE.acento, fontWeight: '800', marginTop: 6, fontSize: 12 },
  titulo: { marginTop: 4, fontSize: 25, color: PALETTE.principal, fontWeight: '800' },
  dato: { marginTop: 6, color: PALETTE.secundario, fontSize: 14 },
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
  subtitulo: { fontSize: 18, fontWeight: '800', marginTop: 24, marginBottom: 12, color: PALETTE.principal },
  pie: { color: PALETTE.secundario, textAlign: 'center', marginTop: 24, fontSize: 12 },
  accion: { marginTop: 16, backgroundColor: PALETTE.acentoClaro, padding: 14, borderRadius: 12 },
  accionTexto: { color: PALETTE.principal, fontWeight: '700', textAlign: 'center' },
});
