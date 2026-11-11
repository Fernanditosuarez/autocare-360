import React from 'react';
import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { VehiculoNavegable } from '../../components/VehiculoNavegable';
import { useParking } from '../../state/ParkingContext';
import { PALETTE } from '../../theme/palette';

export default function VehiculosScreen() {
  const { clientes, vehiculos } = useParking();

  return (
    <FlatList
      data={vehiculos}
      keyExtractor={(v) => String(v.id)}
      contentContainerStyle={styles.contenido}
      ListHeaderComponent={
        <View>
          <Text style={styles.titulo}>Todos los vehículos</Text>
          <Text style={styles.ayuda}>
            Estado compartido local: creación, edición y eliminación de automotores.
          </Text>
          <Link href="/vehiculos/nuevo" asChild>
            <Pressable style={styles.boton} accessibilityRole="link">
              <Text style={styles.botonTexto}>+ Registrar nuevo vehículo</Text>
            </Pressable>
          </Link>
        </View>
      }
      renderItem={({ item }) => (
        <VehiculoNavegable
          vehiculo={item}
          nombreCliente={
            clientes.find((c) => c.id === item.clienteId)?.nombre ?? 'Cliente no encontrado'
          }
        />
      )}
      ListEmptyComponent={
        <Text style={styles.vacio}>No hay vehículos registrados en el taller.</Text>
      }
      ListFooterComponent={
        <Text style={styles.pie}>Módulo de Vehículos · CRUD Local en memoria</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 18, paddingBottom: 35 },
  titulo: { fontSize: 23, fontWeight: '800', color: PALETTE.principal },
  ayuda: { marginTop: 6, marginBottom: 8, color: PALETTE.secundario, lineHeight: 20 },
  boton: { marginVertical: 12, padding: 14, backgroundColor: PALETTE.acento, borderRadius: 12 },
  botonTexto: { color: '#FFFFFF', fontWeight: '800', textAlign: 'center' },
  vacio: { textAlign: 'center', color: PALETTE.secundario, marginVertical: 20 },
  pie: { textAlign: 'center', color: PALETTE.acento, marginTop: 14, fontSize: 12 },
});
