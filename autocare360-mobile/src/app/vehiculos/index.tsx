import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { VehiculoNavegable } from '../../components/VehiculoNavegable';
import { CLIENTES, VEHICULOS } from '../../data/demoData';
import { PALETTE } from '../../theme/palette';

export default function VehiculosScreen() {
  return (
    <FlatList
      data={VEHICULOS}
      keyExtractor={(vehiculo) => String(vehiculo.id)}
      contentContainerStyle={styles.contenido}
      ListHeaderComponent={
        <View style={styles.encabezado}>
          <Text style={styles.titulo}>Todos los vehículos</Text>
          <Text style={styles.ayuda}>
            Toca una tarjeta para navegar al detalle individual del vehículo.
          </Text>
        </View>
      }
      renderItem={({ item }) => {
        const propietario = CLIENTES.find((c) => c.id === item.clienteId);
        return (
          <VehiculoNavegable
            vehiculo={item}
            nombreCliente={propietario?.nombre ?? 'Cliente no encontrado'}
          />
        );
      }}
      ListFooterComponent={
        <Text style={styles.pie}>Catálogo general de automotores en taller</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 18, paddingBottom: 35 },
  encabezado: { marginBottom: 14 },
  titulo: { fontSize: 23, fontWeight: '800', color: PALETTE.principal },
  ayuda: { marginTop: 6, color: PALETTE.secundario, lineHeight: 20 },
  pie: { color: PALETTE.acento, textAlign: 'center', marginTop: 14, fontSize: 12 },
});
