import React from 'react';
import { useRouter } from 'expo-router';
import { ClienteForm } from '../../components/ClienteForm';
import { useParking } from '../../state/ParkingContext';
import { siguienteId } from '../../state/parkingReducer';

export default function NuevoClienteScreen() {
  const router = useRouter();
  const { clientes, dispatch } = useParking();

  return (
    <ClienteForm
      textoBoton="Crear cliente"
      alGuardar={(valor) => {
        dispatch({
          type: 'CLIENTE_CREAR',
          payload: { id: siguienteId(clientes), ...valor },
        });
        router.replace('/clientes');
      }}
    />
  );
}
