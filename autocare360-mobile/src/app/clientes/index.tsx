import React from 'react';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ClienteCard } from '../../components/ClienteCard';
import { CLIENTES, VEHICULOS } from '../../data/demoData';
import { PALETTE } from '../../theme/palette';

export default function ClientesScreen() {
  const router = useRouter();

  return (
    <FlatList
      data={CLIENTES}
      keyExtractor={(cliente) => String(cliente.id)}
      contentContainerStyle={styles.contenido}
      ListHeaderComponent={
        <View style={styles.encabezado}>
          <Text style={styles.titulo}>Clientes registrados</Text>
          <Text style={styles.ayuda}>
            Toca un cliente para abrir su pantalla de detalle y ver sus vehículos.
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <ClienteCard
          cliente={item}
          cantidadVehiculos={VEHICULOS.filter((v) => v.clienteId === item.id).length}
          seleccionado={false}
          alSeleccionar={() =>
            router.push({
              pathname: '/clientes/[id]',
              params: { id: String(item.id) },
            })
          }
        />
      )}
      ListFooterComponent={
        <Text style={styles.pie}>Datos locales tipados en React Native</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 18, paddingBottom: 35 },
  encabezado: { marginBottom: 12 },
  titulo: { fontSize: 23, fontWeight: '800', color: PALETTE.principal },
  ayuda: { marginTop: 6, marginBottom: 12, color: PALETTE.secundario, lineHeight: 20 },
  pie: { textAlign: 'center', color: PALETTE.acento, marginTop: 14, fontSize: 12 },
});
