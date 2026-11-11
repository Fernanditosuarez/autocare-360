import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { ClienteForm } from '../../components/ClienteForm';
import { useParking } from '../../state/ParkingContext';

export default function NuevoClienteScreen() {
  const router = useRouter();
  const { crearCliente } = useParking();
  const [guardando, setGuardando] = useState(false);

  return (
    <ClienteForm
      textoBoton={guardando ? 'Guardando en servidor...' : 'Crear cliente'}
      alGuardar={async (valor) => {
        setGuardando(true);
        const ok = await crearCliente(valor);
        setGuardando(false);
        if (ok) {
          router.replace('/clientes');
        } else {
          Alert.alert('Error', 'No se pudo registrar el cliente.');
        }
      }}
    />
  );
}
