import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { VehicleForm } from '../../../components/VehicleForm';
import { useParking } from '../../../state/ParkingContext';
import { PALETTE } from '../../../theme/palette';
import { leerIdPositivo } from '../../../utils/routeParams';

export default function EditarVehiculoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { clientes, vehiculos, editarVehiculo } = useParking();
  const [guardando, setGuardando] = useState(false);
  const vehiculoId = leerIdPositivo(id);
  const vehiculo = vehiculos.find((v) => v.id === vehiculoId);

  if (!vehiculo) {
    return (
      <View style={styles.caja}>
        <Text style={styles.error}>Vehículo no encontrado para edición.</Text>
      </View>
    );
  }

  return (
    <VehicleForm
      clientes={clientes}
      valorInicial={{
        clienteId: vehiculo.clienteId,
        placa: vehiculo.placa,
        marca: vehiculo.marca,
        modelo: vehiculo.modelo,
      }}
      textoBoton={guardando ? 'Guardando cambios...' : 'Guardar cambios'}
      alGuardar={async (valor) => {
        if (valor.clienteId === null) return;
        setGuardando(true);
        const ok = await editarVehiculo(vehiculo.id, {
          clienteId: valor.clienteId,
          placa: valor.placa,
          marca: valor.marca,
          modelo: valor.modelo,
        });
        setGuardando(false);
        if (ok) {
          router.replace({
            pathname: '/vehiculos/[id]',
            params: { id: String(vehiculo.id) },
          });
        } else {
          Alert.alert('Error', 'No se pudo actualizar el vehículo.');
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  caja: { padding: 20 },
  error: { color: PALETTE.peligro, fontWeight: '700' },
});
