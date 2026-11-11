import React from 'react';
import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { VehiculoNavegable } from '../../components/VehiculoNavegable';
import { CLIENTES, VEHICULOS } from '../../data/demoData';
import { PALETTE } from '../../theme/palette';

export default function VehiculosScreen() {
  return (
    <FlatList
      data={VEHICULOS}
      keyExtractor={(v) => String(v.id)}
      contentContainerStyle={styles.contenido}
      ListHeaderComponent={
        <View>
          <Text style={styles.titulo}>Vehículos (demostración)</Text>
          <Text style={styles.ayuda}>
            Guía 04: primero validaremos el formulario, después guardaremos.
          </Text>
          <Link href="/vehiculos/nuevo" asChild>
            <Pressable style={styles.boton} accessibilityRole="link">
              <Text style={styles.botonTexto}>+ Formulario nuevo vehículo</Text>
            </Pressable>
          </Link>
        </View>
      }
      renderItem={({ item }) => (
        <VehiculoNavegable
          vehiculo={item}
          nombreCliente={
            CLIENTES.find((c) => c.id === item.clienteId)?.nombre ?? 'Sin cliente'
          }
        />
      )}
      ListFooterComponent={
        <Text style={styles.ayuda}>Los 5 vehículos todavía son datos locales.</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 18, paddingBottom: 35 },
  titulo: { fontSize: 23, fontWeight: '800', color: PALETTE.principal },
  ayuda: { marginTop: 10, marginBottom: 12, color: PALETTE.secundario, lineHeight: 21 },
  boton: { marginVertical: 13, padding: 14, backgroundColor: PALETTE.acento, borderRadius: 12 },
  botonTexto: { color: '#FFFFFF', fontWeight: '800', textAlign: 'center' },
});
