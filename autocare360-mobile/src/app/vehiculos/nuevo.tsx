import React from 'react';
import { useRouter } from 'expo-router';
import { VehicleForm } from '../../components/VehicleForm';
import { useParking } from '../../state/ParkingContext';
import { siguienteId } from '../../state/parkingReducer';

export default function NuevoVehiculoScreen() {
  const router = useRouter();
  const { clientes, vehiculos, dispatch } = useParking();

  return (
    <VehicleForm
      clientes={clientes}
      textoBoton="Registrar vehículo"
      alGuardar={(valor) => {
        if (valor.clienteId === null) return;
        dispatch({
          type: 'VEHICULO_CREAR',
          payload: {
            id: siguienteId(vehiculos),
            clienteId: valor.clienteId,
            placa: valor.placa,
            marca: valor.marca,
            modelo: valor.modelo,
          },
        });
        router.replace('/vehiculos');
      }}
    />
  );
}
