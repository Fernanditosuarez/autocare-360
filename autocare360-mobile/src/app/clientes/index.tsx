import React from 'react';
import { Link, useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { ClienteCard } from '../../components/ClienteCard';
import { useParking } from '../../state/ParkingContext';
import { PALETTE } from '../../theme/palette';

export default function ClientesScreen() {
  const router = useRouter();
  const { clientes, vehiculos } = useParking();

  return (
    <FlatList
      data={clientes}
      keyExtractor={(cliente) => String(cliente.id)}
      contentContainerStyle={styles.contenido}
      ListHeaderComponent={
        <View style={styles.encabezado}>
          <Text style={styles.titulo}>Clientes registrados</Text>
          <Text style={styles.ayuda}>
            Estado compartido local con Context API: los cambios persisten durante la sesión.
          </Text>
          <Link href="/clientes/nuevo" asChild>
            <Pressable style={styles.botonCrear} accessibilityRole="link">
              <Text style={styles.textoBotonCrear}>+ Crear nuevo cliente</Text>
            </Pressable>
          </Link>
        </View>
      }
      renderItem={({ item }) => (
        <ClienteCard
          cliente={item}
          cantidadVehiculos={
            vehiculos.filter((v) => v.clienteId === item.id).length
          }
          seleccionado={false}
          alSeleccionar={() =>
            router.push({
              pathname: '/clientes/[id]',
              params: { id: String(item.id) },
            })
          }
        />
      )}
      ListEmptyComponent={
        <Text style={styles.vacio}>No hay clientes registrados en la sesión actual.</Text>
      }
      ListFooterComponent={
        <Text style={styles.pie}>Módulo de Clientes · CRUD Local interactivo</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 18, paddingBottom: 35 },
  encabezado: { marginBottom: 12 },
  titulo: { fontSize: 23, fontWeight: '800', color: PALETTE.principal },
  ayuda: { marginTop: 6, marginBottom: 12, color: PALETTE.secundario, lineHeight: 20 },
  botonCrear: {
    backgroundColor: PALETTE.acento,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  textoBotonCrear: { color: '#FFFFFF', fontWeight: '800', textAlign: 'center' },
  vacio: { textAlign: 'center', color: PALETTE.secundario, marginVertical: 20 },
  pie: { textAlign: 'center', color: PALETTE.acento, marginTop: 14, fontSize: 12 },
});
