import React from 'react';
import { Alert } from 'react-native';
import { VehicleForm } from '../../components/VehicleForm';
import { CLIENTES } from '../../data/demoData';

export default function NuevoVehiculoScreen() {
  return (
    <VehicleForm
      clientes={CLIENTES}
      alGuardar={(valor) => {
        Alert.alert(
          'Formulario correcto (sin guardar)',
          `Cliente ID: ${valor.clienteId}\nPlaca: ${valor.placa}\nMarca: ${valor.marca}\nModelo: ${valor.modelo}`
        );
      }}
    />
  );
}
