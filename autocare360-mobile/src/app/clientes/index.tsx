import React, { useMemo, useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { ClienteCard } from '../../components/ClienteCard';
import { SearchBar } from '../../components/SearchBar';
import { useParking } from '../../state/ParkingContext';
import { PALETTE } from '../../theme/palette';

type FiltroEstado = 'TODOS' | 'ACTIVOS' | 'INACTIVOS';

export default function ClientesScreen() {
  const router = useRouter();
  const { clientes, vehiculos } = useParking();
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<FiltroEstado>('TODOS');

  const clientesFiltrados = useMemo(() => {
    return clientes.filter((c) => {
      const q = busqueda.toLowerCase().trim();
      const coincideTexto =
        q === '' ||
        c.nombre.toLowerCase().includes(q) ||
        c.correo.toLowerCase().includes(q);
      const coincideEstado =
        filtroEstado === 'TODOS'
          ? true
          : filtroEstado === 'ACTIVOS'
          ? c.activo
          : !c.activo;
      return coincideTexto && coincideEstado;
    });
  }, [clientes, busqueda, filtroEstado]);

  return (
    <FlatList
      data={clientesFiltrados}
      keyExtractor={(cliente) => String(cliente.id)}
      contentContainerStyle={styles.contenido}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      windowSize={5}
      removeClippedSubviews={true}
      ListHeaderComponent={
        <View style={styles.encabezado}>
          <Text style={styles.titulo}>Clientes registrados</Text>
          <Text style={styles.ayuda}>
            Búsqueda en tiempo real por nombre/correo y filtros por estado.
          </Text>

          <SearchBar
            value={busqueda}
            onChangeText={setBusqueda}
            placeholder="Buscar por nombre o correo..."
          />

          <View style={styles.chipsContainer}>
            {(['TODOS', 'ACTIVOS', 'INACTIVOS'] as const).map((estado) => (
              <Pressable
                key={estado}
                onPress={() => setFiltroEstado(estado)}
                style={[
                  styles.chip,
                  filtroEstado === estado && styles.chipActivo,
                ]}
              >
                <Text
                  style={[
                    styles.chipTexto,
                    filtroEstado === estado && styles.chipTextoActivo,
                  ]}
                >
                  {estado}
                </Text>
              </Pressable>
            ))}
          </View>

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
        <Text style={styles.vacio}>
          No se encontraron clientes que coincidan con los criterios de búsqueda.
        </Text>
      }
      ListFooterComponent={
        <Text style={styles.pie}>
          Mostrando {clientesFiltrados.length} de {clientes.length} clientes
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
  chipsContainer: { flexDirection: 'row', gap: 8, marginBottom: 12 },
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
  botonCrear: {
    backgroundColor: PALETTE.acento,
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
  },
  textoBotonCrear: { color: '#FFFFFF', fontWeight: '800', textAlign: 'center' },
  vacio: { textAlign: 'center', color: PALETTE.secundario, marginVertical: 20 },
  pie: { textAlign: 'center', color: PALETTE.acento, marginTop: 14, fontSize: 12 },
});
