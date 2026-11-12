import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { PALETTE } from '../theme/palette';

type Props = {
  visible: boolean;
  titulo: string;
  mensaje: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  cargando?: boolean;
  alConfirmar: () => void;
  alCancelar: () => void;
};

export function ConfirmModal({
  visible,
  titulo,
  mensaje,
  textoConfirmar = 'Confirmar',
  textoCancelar = 'Cancelar',
  cargando = false,
  alConfirmar,
  alCancelar,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={alCancelar}>
      <View style={styles.overlay}>
        <View style={styles.caja}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.mensaje}>{mensaje}</Text>
          <View style={styles.acciones}>
            <Pressable style={styles.botonCancelar} onPress={alCancelar} disabled={cargando}>
              <Text style={styles.textoCancelar}>{textoCancelar}</Text>
            </Pressable>
            <Pressable style={styles.botonConfirmar} onPress={alConfirmar} disabled={cargando}>
              <Text style={styles.textoConfirmar}>{cargando ? 'Procesando...' : textoConfirmar}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  caja: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 22,
    width: '100%',
    maxWidth: 340,
    elevation: 5,
  },
  titulo: { fontSize: 18, fontWeight: '800', color: PALETTE.principal, marginBottom: 8 },
  mensaje: { fontSize: 14, color: PALETTE.secundario, lineHeight: 20, marginBottom: 20 },
  acciones: { flexDirection: 'row', gap: 10, justifyContent: 'flex-end' },
  botonCancelar: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, backgroundColor: PALETTE.fondo },
  botonConfirmar: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, backgroundColor: PALETTE.peligro },
  textoCancelar: { fontWeight: '700', color: PALETTE.principal },
  textoConfirmar: { fontWeight: '700', color: '#FFFFFF' },
});
