import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import { ClienteCard } from './src/components/ClienteCard';
import { EmptyState } from './src/components/EmptyState';
import { MetricCard } from './src/components/MetricCard';
import { TabSelector } from './src/components/TabSelector';
import { VehiculoCard } from './src/components/VehiculoCard';
import { CLIENTES, VEHICULOS } from './src/data/demoData';
import type { Seccion } from './src/models/parking';
import { PALETTE } from './src/theme/palette';

export default function App() {
  const [seccion, setSeccion] = useState<Seccion>('clientes');
  const [clienteId, setClienteId] = useState<number | null>(null);

  // Estado Derivado
  const clienteElegido = CLIENTES.find((c) => c.id === clienteId) ?? null;
  const vehiculosElegidos = clienteElegido
    ? VEHICULOS.filter((v) => v.clienteId === clienteElegido.id)
    : [];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.pantalla} edges={['top', 'bottom']}>
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={styles.contenido}>
          <Text style={styles.etiqueta}>PROGRAMACIÓN APLICADA · MÓVIL</Text>
          <Text style={styles.titulo}>AutoCare 360</Text>
          <Text style={styles.subtitulo}>
            Guía 02: Arquitectura modular, componentes, props y estado local.
          </Text>

          {/* Métricas Generales */}
          <View style={styles.indicadores}>
            <MetricCard etiqueta="Clientes registrados" valor={CLIENTES.length} />
            <MetricCard etiqueta="Vehículos ingresados" valor={VEHICULOS.length} />
          </View>

          {/* Navegación por Secciones */}
          <Text style={styles.seccionTitulo}>Explorar información</Text>
          <TabSelector actual={seccion} alCambiar={setSeccion} />

          {/* Módulo de Clientes */}
          {seccion === 'clientes' ? (
            <View style={styles.grupo}>
              <Text style={styles.ayuda}>
                Toca un cliente para ver sus vehículos en el taller:
              </Text>
              {CLIENTES.map((cliente) => (
                <ClienteCard
                  key={cliente.id}
                  cliente={cliente}
                  cantidadVehiculos={
                    VEHICULOS.filter((v) => v.clienteId === cliente.id).length
                  }
                  seleccionado={clienteId === cliente.id}
                  alSeleccionar={() => setClienteId(cliente.id)}
                />
              ))}

              {/* Panel de Detalle del Cliente Seleccionado */}
              {clienteElegido && (
                <View style={styles.panelDetalle}>
                  <Text style={styles.panelTitulo}>
                    Vehículos de {clienteElegido.nombre}
                  </Text>
                  {vehiculosElegidos.length === 0 ? (
                    <EmptyState mensaje="Este cliente no tiene vehículos de prueba registrados." />
                  ) : (
                    vehiculosElegidos.map((vehiculo) => (
                      <VehiculoCard
                        key={vehiculo.id}
                        vehiculo={vehiculo}
                        nombreCliente={clienteElegido.nombre}
                      />
                    ))
                  )}
                </View>
              )}
            </View>
          ) : (
            /* Módulo de Vehículos Completo */
            <View style={styles.grupo}>
              <Text style={styles.ayuda}>
                Catálogo completo de vehículos en el taller:
              </Text>
              {VEHICULOS.map((vehiculo) => {
                const propietario = CLIENTES.find(
                  (c) => c.id === vehiculo.clienteId
                );
                return (
                  <VehiculoCard
                    key={vehiculo.id}
                    vehiculo={vehiculo}
                    nombreCliente={propietario?.nombre ?? 'Cliente no encontrado'}
                  />
                );
              })}
            </View>
          )}

          <Text style={styles.pie}>
            Relación Cliente (1) — (N) Vehículo en React Native
          </Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: PALETTE.fondo,
  },
  contenido: {
    padding: 20,
    paddingBottom: 40,
  },
  etiqueta: {
    fontSize: 11,
    fontWeight: '800',
    color: PALETTE.acento,
    letterSpacing: 1,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: PALETTE.principal,
    marginTop: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: PALETTE.secundario,
    marginTop: 4,
    marginBottom: 20,
  },
  indicadores: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  seccionTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: PALETTE.principal,
    marginBottom: 12,
  },
  grupo: {
    marginTop: 4,
  },
  ayuda: {
    fontSize: 13,
    color: PALETTE.secundario,
    marginBottom: 12,
  },
  panelDetalle: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: PALETTE.borde,
  },
  panelTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: PALETTE.principal,
    marginBottom: 12,
  },
  pie: {
    textAlign: 'center',
    fontSize: 12,
    color: PALETTE.secundario,
    marginTop: 32,
  },
});
