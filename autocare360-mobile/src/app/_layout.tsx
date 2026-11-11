import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ParkingProvider } from '../state/ParkingContext';
import { PALETTE } from '../theme/palette';

export default function RootLayout() {
  return (
    <ParkingProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: PALETTE.principal },
          headerTintColor: PALETTE.superficie,
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: PALETTE.fondo },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'AutoCare 360' }} />
        <Stack.Screen name="clientes/index" options={{ title: 'Clientes' }} />
        <Stack.Screen name="clientes/nuevo" options={{ title: 'Nuevo cliente' }} />
        <Stack.Screen name="clientes/editar/[id]" options={{ title: 'Editar cliente' }} />
        <Stack.Screen name="clientes/[id]" options={{ title: 'Detalle del Cliente' }} />
        <Stack.Screen name="vehiculos/index" options={{ title: 'Vehículos' }} />
        <Stack.Screen name="vehiculos/nuevo" options={{ title: 'Nuevo vehículo' }} />
        <Stack.Screen name="vehiculos/editar/[id]" options={{ title: 'Editar vehículo' }} />
        <Stack.Screen name="vehiculos/[id]" options={{ title: 'Detalle del Vehículo' }} />
        <Stack.Screen name="ayuda" options={{ title: 'Acerca de la Práctica' }} />
        <Stack.Screen name="+not-found" options={{ title: 'Ruta Desconocida' }} />
      </Stack>
    </ParkingProvider>
  );
}
