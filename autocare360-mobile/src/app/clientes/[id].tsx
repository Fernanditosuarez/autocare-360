import React from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../../components/EmptyState';
import { ReturnButton } from '../../components/ReturnButton';
import { VehiculoNavegable } from '../../components/VehiculoNavegable';
import { CLIENTES, VEHICULOS } from '../../data/demoData';
import { PALETTE } from '../../theme/palette';
import { leerIdPositivo } from '../../utils/routeParams';

export default function DetalleClienteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const clienteId = leerIdPositivo(id);
  const cliente = CLIENTES.find((c) => c.id === clienteId);

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

  const vehiculos = VEHICULOS.filter((v) => v.clienteId === cliente.id);

  return (
    <ScrollView contentContainerStyle={styles.contenido}>
      <ReturnButton destinoSiNoHayHistorial="/clientes" />
      <Text style={styles.etiqueta}>CLIENTE N.º {cliente.id}</Text>
      <Text style={styles.titulo}>{cliente.nombre}</Text>
      <Text style={styles.dato}>Correo: {cliente.correo}</Text>
      <Text style={styles.dato}>
        Estado: {cliente.activo ? 'ACTIVO' : 'INACTIVO'}
      </Text>

      <Text style={styles.subtitulo}>Vehículos asociados ({vehiculos.length})</Text>

      {vehiculos.length === 0 ? (
        <EmptyState mensaje="Este cliente no tiene vehículos de prueba registrados." />
      ) : (
        vehiculos.map((v) => (
          <VehiculoNavegable
            key={v.id}
            vehiculo={v}
            nombreCliente={cliente.nombre}
          />
        ))
      )}

      <Text style={styles.pie}>Relación Cliente (1) — (N) Vehículo con Expo Router</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 18, paddingBottom: 40 },
  etiqueta: { color: PALETTE.acento, fontWeight: '800', marginTop: 6, fontSize: 12 },
  titulo: { marginTop: 4, fontSize: 25, color: PALETTE.principal, fontWeight: '800' },
  dato: { marginTop: 6, color: PALETTE.secundario, fontSize: 14 },
  subtitulo: { fontSize: 18, fontWeight: '800', marginTop: 24, marginBottom: 12, color: PALETTE.principal },
  pie: { color: PALETTE.secundario, textAlign: 'center', marginTop: 24, fontSize: 12 },
  accion: { marginTop: 16, backgroundColor: PALETTE.acentoClaro, padding: 14, borderRadius: 12 },
  accionTexto: { color: PALETTE.principal, fontWeight: '700', textAlign: 'center' },
});
