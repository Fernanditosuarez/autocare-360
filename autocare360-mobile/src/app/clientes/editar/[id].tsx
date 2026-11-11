import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { ClienteForm } from '../../../components/ClienteForm';
import { useParking } from '../../../state/ParkingContext';
import { PALETTE } from '../../../theme/palette';
import { leerIdPositivo } from '../../../utils/routeParams';

export default function EditarClienteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { clientes, dispatch } = useParking();
  const clienteId = leerIdPositivo(id);
  const cliente = clientes.find((c) => c.id === clienteId);

  if (!cliente) {
    return (
      <View style={styles.caja}>
        <Text style={styles.error}>Cliente no encontrado para edición.</Text>
      </View>
    );
  }

  return (
    <ClienteForm
      valorInicial={{
        nombre: cliente.nombre,
        correo: cliente.correo,
        activo: cliente.activo,
      }}
      textoBoton="Guardar cambios"
      alGuardar={(valor) => {
        dispatch({
          type: 'CLIENTE_EDITAR',
          payload: { id: cliente.id, ...valor },
        });
        router.replace({
          pathname: '/clientes/[id]',
          params: { id: String(cliente.id) },
        });
      }}
    />
  );
}

const styles = StyleSheet.create({
  caja: { padding: 20 },
  error: { color: PALETTE.peligro, fontWeight: '700' },
});
