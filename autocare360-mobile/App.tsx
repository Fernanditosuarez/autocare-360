import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

type Seccion = 'clientes' | 'vehiculos';

export default function App() {
  const [seccion, setSeccion] = useState<Seccion>('clientes');
  const esClientes = seccion === 'clientes';

  return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.pantalla} edges={['top', 'bottom']}>
          <StatusBar style="dark" />
          <ScrollView contentContainerStyle={styles.contenido}>
            <Text style={styles.etiqueta}>PROGRAMACIÓN APLICADA · MÓVIL</Text>
            <Text style={styles.titulo}>AutoCare 360</Text>
            <Text style={styles.subtitulo}>
              "Primera aplicación móvil de Fernando con React Native y Expo."            </Text>

            {/* Tarjetas de Indicadores */}
            <View style={styles.filaIndicadores}>
              <View style={styles.indicador}>
                <Text style={styles.numero}>0</Text>
                <Text style={styles.indicadorTexto}>Clientes Registrados</Text>
              </View>
              <View style={styles.indicador}>
                <Text style={styles.numero}>0</Text>
                <Text style={styles.indicadorTexto}>Vehículos Ingresados</Text>
              </View>
            </View>

            {/* Botones de Selección */}
            <Text style={styles.seccionTitulo}>Explorar módulos</Text>
            <View style={styles.filaBotones}>
              <Pressable
                  style={[styles.botonTab, esClientes && styles.botonActivo]}
                  onPress={() => setSeccion('clientes')}
              >
                <Text style={[styles.botonTexto, esClientes && styles.textoActivo]}>
                  Clientes
                </Text>
              </Pressable>

              <Pressable
                  style={[styles.botonTab, !esClientes && styles.botonActivo]}
                  onPress={() => setSeccion('vehiculos')}
              >
                <Text style={[styles.botonTexto, !esClientes && styles.textoActivo]}>
                  Vehículos
                </Text>
              </Pressable>
            </View>

            {/* Panel Dinámico según Estado Local */}
            <View style={styles.panelInfo}>
              <Text style={styles.panelTitulo}>
                {esClientes ? 'Módulo de Clientes' : 'Módulo de Vehículos'}
              </Text>
              <Text style={styles.panelDescripcion}>
                {esClientes
                    ? 'Gestión de propietarios de vehículos en el taller automotriz.'
                    : 'Control de automotores por placa, tipo, marca y modelo.'}
              </Text>
            </View>

            <Text style={styles.pie}>
              Guía 01 · Estado local interactivo en React Native
            </Text>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#F8FAFC' },
  contenido: { padding: 20, paddingBottom: 40 },
  etiqueta: { fontSize: 11, fontWeight: '800', color: '#2563EB', letterSpacing: 1 },
  titulo: { fontSize: 28, fontWeight: '800', color: '#0F172A', marginTop: 4 },
  subtitulo: { fontSize: 14, color: '#64748B', marginTop: 4, marginBottom: 20 },
  filaIndicadores: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  indicador: { flex: 1, backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center' },
  numero: { fontSize: 28, fontWeight: '800', color: '#0F172A' },
  indicadorTexto: { fontSize: 12, color: '#64748B', marginTop: 4, fontWeight: '500' },
  seccionTitulo: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 12 },
  filaBotones: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  botonTab: { flex: 1, paddingVertical: 12, backgroundColor: '#E2E8F0', borderRadius: 8, alignItems: 'center' },
  botonActivo: { backgroundColor: '#2563EB' },
  botonTexto: { fontSize: 14, fontWeight: '700', color: '#475569' },
  textoActivo: { color: '#FFFFFF' },
  panelInfo: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#CBD5E1', marginTop: 8 },
  panelTitulo: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 6 },
  panelDescripcion: { fontSize: 13, color: '#64748B', lineHeight: 18 },
  pie: { textAlign: 'center', fontSize: 12, color: '#94A3B8', marginTop: 32 },
});