import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { VehicleForm } from '../../components/VehicleForm';
import { useParking } from '../../state/ParkingContext';

export default function NuevoVehiculoScreen() {
  const router = useRouter();
  const { clientes, crearVehiculo } = useParking();
  const [guardando, setGuardando] = useState(false);

  return (
    <VehicleForm
      clientes={clientes}
      textoBoton={guardando ? 'Guardando en servidor...' : 'Registrar vehículo'}
      alGuardar={async (valor) => {
        if (valor.clienteId === null) return;
        setGuardando(true);
        const ok = await crearVehiculo({
          clienteId: valor.clienteId,
          placa: valor.placa,
          marca: valor.marca,
          modelo: valor.modelo,
        });
        setGuardando(false);
        if (ok) {
          router.replace('/vehiculos');
        } else {
          Alert.alert('Error', 'No se pudo registrar el vehículo.');
        }
      }}
    />
  );
}
