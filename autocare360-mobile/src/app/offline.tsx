import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ReturnButton } from '../components/ReturnButton';
import type { Cliente } from '../models/parking';
import { clienteApi } from '../services/api';
import { sqliteService } from '../services/sqlite';
import { useParking } from '../state/ParkingContext';
import { PALETTE } from '../theme/palette';

export default function OfflineScreen() {
  const { clientes } = useParking();
  const [cacheClientes, setCacheClientes] = useState<Cliente[]>([]);
  const [sincronizando, setSincronizando] = useState(false);
  const [cargandoCache, setCargandoCache] = useState(true);

  async function cargarCacheLocal() {
    setCargandoCache(true);
    await sqliteService.inicializar();
    const datos = await sqliteService.obtenerClientes();
    setCacheClientes(datos);
    setCargandoCache(false);
  }

  useEffect(() => {
    cargarCacheLocal();
  }, []);

  async function sincronizarHaciaSQLite() {
    setSincronizando(true);
    try {
      let datosASincronizar = clientes;
      try {
        const remotos = await clienteApi.obtenerTodos();
        if (remotos && remotos.length > 0) {
          datosASincronizar = remotos;
        }
      } catch {
        console.log('API sin conexión, sincronizando estado local...');
      }

      const ok = await sqliteService.guardarClientes(datosASincronizar);
      if (ok) {
        Alert.alert('Éxito', `Se guardaron ${datosASincronizar.length} clientes en la BD SQLite local.`);
        await cargarCacheLocal();
      } else {
        Alert.alert('Error', 'No se pudo guardar en SQLite.');
      }
    } finally {
      setSincronizando(false);
    }
  }

  async function vaciarCache() {
    const ok = await sqliteService.limpiarCache();
    if (ok) {
      Alert.alert('Caché vaciada', 'Se eliminaron los registros locales de SQLite.');
      await cargarCacheLocal();
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.contenido}>
      <ReturnButton destinoSiNoHayHistorial="/" />
      <Text style={styles.etiqueta}>PROGRAMACIÓN APLICADA · GUÍA 12</Text>
      <Text style={styles.titulo}>Caché Local & Offline (SQLite)</Text>
      <Text style={styles.descripcion}>
        Persistencia en base de datos relacional interna SQLite para operar sin conexión a Internet.
      </Text>

      <View style={styles.filaBotones}>
        <Pressable style={styles.botonAcento} onPress={sincronizarHaciaSQLite} disabled={sincronizando}>
          <Text style={styles.textoBotonBlanco}>
            {sincronizando ? 'Sincronizando...' : '🔄 Sincronizar a SQLite'}
          </Text>
        </Pressable>

        <Pressable style={styles.botonPeligro} onPress={vaciarCache} disabled={sincronizando}>
          <Text style={styles.textoBotonBlanco}>🗑️ Vaciar Caché</Text>
        </Pressable>
      </View>

      <Text style={styles.subtitulo}>
        Registros en SQLite local ({cacheClientes.length})
      </Text>

      {cargandoCache ? (
        <View style={styles.cajaCarga}>
          <ActivityIndicator size="small" color={PALETTE.acento} />
          <Text style={styles.textoCarga}>Leyendo base de datos SQLite...</Text>
        </View>
      ) : cacheClientes.length === 0 ? (
        <View style={styles.tarjetaVacia}>
          <Text style={styles.textoVacio}>No hay clientes en la base de datos SQLite local.</Text>
        </View>
      ) : (
        cacheClientes.map((item) => (
          <View key={item.id} style={styles.tarjetaCliente}>
            <Text style={styles.nombreCliente}>{item.nombre}</Text>
            <Text style={styles.correoCliente}>{item.correo}</Text>
            <Text style={styles.estadoCliente}>
              Estado: {item.activo ? 'ACTIVO' : 'INACTIVO'}
            </Text>
          </View>
        ))
      )}

      <Text style={styles.pie}>
        Al perder la conexión con el servidor, la aplicación puede recuperar estos datos almacenados en el almacenamiento SQLite del teléfono.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 18, paddingBottom: 40 },
  etiqueta: { fontSize: 11, fontWeight: '800', color: PALETTE.acento, letterSpacing: 1 },
  titulo: { fontSize: 25, fontWeight: '800', color: PALETTE.principal, marginTop: 4 },
  descripcion: { fontSize: 14, color: PALETTE.secundario, marginTop: 4, marginBottom: 16, lineHeight: 20 },
  filaBotones: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  botonAcento: { flex: 1, backgroundColor: PALETTE.acento, padding: 14, borderRadius: 10, alignItems: 'center' },
  botonPeligro: { backgroundColor: PALETTE.peligro, padding: 14, borderRadius: 10, alignItems: 'center' },
  textoBotonBlanco: { color: '#FFFFFF', fontWeight: '800', fontSize: 13 },
  subtitulo: { fontSize: 16, fontWeight: '800', color: PALETTE.principal, marginBottom: 12 },
  cajaCarga: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 16 },
  textoCarga: { color: PALETTE.secundario, fontSize: 13 },
  tarjetaVacia: { padding: 20, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: PALETTE.borde },
  textoVacio: { color: PALETTE.secundario, textAlign: 'center', fontSize: 13 },
  tarjetaCliente: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: PALETTE.borde,
    marginBottom: 10,
  },
  nombreCliente: { fontSize: 15, fontWeight: '800', color: PALETTE.principal },
  correoCliente: { fontSize: 13, color: PALETTE.secundario, marginTop: 2 },
  estadoCliente: { fontSize: 11, fontWeight: '700', color: PALETTE.acento, marginTop: 6 },
  pie: { textAlign: 'center', color: PALETTE.secundario, fontSize: 12, marginTop: 20, lineHeight: 18 },
});
