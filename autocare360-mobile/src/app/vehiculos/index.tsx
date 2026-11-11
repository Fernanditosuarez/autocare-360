import React, { useMemo, useState } from 'react';
import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from '../../components/SearchBar';
import { VehiculoNavegable } from '../../components/VehiculoNavegable';
import { useParking } from '../../state/ParkingContext';
import { PALETTE } from '../../theme/palette';

export default function VehiculosScreen() {
  const { clientes, vehiculos } = useParking();
  const [busqueda, setBusqueda] = useState('');
  const [clienteFiltroId, setClienteFiltroId] = useState<number | null>(null);

  const vehiculosFiltrados = useMemo(() => {
    return vehiculos.filter((v) => {
      const q = busqueda.toLowerCase().trim();
      const coincideTexto =
        q === '' ||
        v.placa.toLowerCase().includes(q) ||
        v.marca.toLowerCase().includes(q) ||
        v.modelo.toLowerCase().includes(q);
      const coincideCliente =
        clienteFiltroId === null ? true : v.clienteId === clienteFiltroId;
      return coincideTexto && coincideCliente;
    });
  }, [vehiculos, busqueda, clienteFiltroId]);

  return (
    <FlatList
      data={vehiculosFiltrados}
      keyExtractor={(v) => String(v.id)}
      contentContainerStyle={styles.contenido}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      windowSize={5}
      removeClippedSubviews={true}
      ListHeaderComponent={
        <View style={styles.encabezado}>
          <Text style={styles.titulo}>Todos los vehículos</Text>
          <Text style={styles.ayuda}>
            Búsqueda en tiempo real por placa/marca/modelo y filtro por propietario.
          </Text>

          <SearchBar
            value={busqueda}
            onChangeText={setBusqueda}
            placeholder="Buscar por placa, marca o modelo..."
          />

          {/* Chips horizontales de filtro por Cliente */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[{ id: null, nombre: 'Todos' }, ...clientes]}
            keyExtractor={(item) => String(item.id ?? 'todos')}
            contentContainerStyle={styles.listaClientesFiltro}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setClienteFiltroId(item.id)}
                style={[
                  styles.chip,
                  clienteFiltroId === item.id && styles.chipActivo,
                ]}
              >
                <Text
                  style={[
                    styles.chipTexto,
                    clienteFiltroId === item.id && styles.chipTextoActivo,
                  ]}
                >
                  {item.nombre}
                </Text>
              </Pressable>
            )}
          />

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
        <Text style={styles.vacio}>
          No se encontraron vehículos que coincidan con la búsqueda.
        </Text>
      }
      ListFooterComponent={
        <Text style={styles.pie}>
          Mostrando {vehiculosFiltrados.length} de {vehiculos.length} vehículos
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 18, paddingBottom: 35 },
  encabezado: { marginBottom: 12 },
  titulo: { fontSize: 23, fontWeight: '800', color: PALETTE.principal },
  ayuda: { marginTop: 4, marginBottom: 12, color: PALETTE.secundario, lineHeight: 20 },
  listaClientesFiltro: { gap: 8, paddingBottom: 12 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: PALETTE.borde,
    backgroundColor: '#FFFFFF',
  },
  chipActivo: { backgroundColor: PALETTE.acento, borderColor: PALETTE.acento },
  chipTexto: { fontSize: 12, fontWeight: '700', color: PALETTE.secundario },
  chipTextoActivo: { color: '#FFFFFF' },
  boton: { marginVertical: 8, padding: 14, backgroundColor: PALETTE.acento, borderRadius: 12 },
  botonTexto: { color: '#FFFFFF', fontWeight: '800', textAlign: 'center' },
  vacio: { textAlign: 'center', color: PALETTE.secundario, marginVertical: 20 },
  pie: { textAlign: 'center', color: PALETTE.acento, marginTop: 14, fontSize: 12 },
});
