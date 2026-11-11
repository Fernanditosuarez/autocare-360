import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { ClienteForm } from '../../../components/ClienteForm';
import { useParking } from '../../../state/ParkingContext';
import { PALETTE } from '../../../theme/palette';
import { leerIdPositivo } from '../../../utils/routeParams';

export default function EditarClienteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { clientes, editarCliente } = useParking();
  const [guardando, setGuardando] = useState(false);
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
      textoBoton={guardando ? 'Guardando cambios...' : 'Guardar cambios'}
      alGuardar={async (valor) => {
        setGuardando(true);
        const ok = await editarCliente(cliente.id, valor);
        setGuardando(false);
        if (ok) {
          router.replace({
            pathname: '/clientes/[id]',
            params: { id: String(cliente.id) },
          });
        } else {
          Alert.alert('Error', 'No se pudo actualizar el cliente.');
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  caja: { padding: 20 },
  error: { color: PALETTE.peligro, fontWeight: '700' },
});
