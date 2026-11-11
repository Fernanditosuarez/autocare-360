import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import type { Cliente } from '../models/parking';
import {
  normalizarPlaca,
  validarVehiculo,
  type VehiculoFormErrores,
  type VehiculoFormValue,
} from '../domain/validaciones';
import { PALETTE } from '../theme/palette';

type Props = {
  clientes: readonly Cliente[];
  valorInicial?: VehiculoFormValue;
  textoBoton?: string;
  alGuardar: (valor: VehiculoFormValue) => void;
};

const VACIO: VehiculoFormValue = { clienteId: null, placa: '', marca: '', modelo: '' };

export function VehicleForm({
  clientes,
  valorInicial = VACIO,
  textoBoton = 'Revisar datos',
  alGuardar,
}: Props) {
  const [form, setForm] = useState<VehiculoFormValue>(valorInicial);
  const [errores, setErrores] = useState<VehiculoFormErrores>({});
  const [intentado, setIntentado] = useState(false);

  function cambiar<K extends keyof VehiculoFormValue>(clave: K, valor: VehiculoFormValue[K]) {
    setForm((actual) => ({ ...actual, [clave]: valor }));
    if (intentado) setErrores({});
  }

  function guardar() {
    setIntentado(true);
    const encontrados = validarVehiculo(
      form,
      clientes.map((c) => c.id)
    );
    setErrores(encontrados);
    if (Object.keys(encontrados).length !== 0) return;

    alGuardar({
      ...form,
      placa: normalizarPlaca(form.placa),
      marca: form.marca.trim(),
      modelo: form.modelo.trim(),
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.contenido} keyboardShouldPersistTaps="handled">
      <Text style={styles.etiqueta}>PROPIETARIO (OBLIGATORIO)</Text>
      {clientes.map((cliente) => (
        <Pressable
          key={cliente.id}
          accessibilityRole="radio"
          accessibilityState={{ selected: form.clienteId === cliente.id }}
          onPress={() => cambiar('clienteId', cliente.id)}
          style={[
            styles.opcion,
            form.clienteId === cliente.id && styles.seleccionado,
          ]}
        >
          <Text style={styles.texto}>
            {form.clienteId === cliente.id ? '◉ ' : '○ '}
            {cliente.nombre}
          </Text>
        </Pressable>
      ))}
      {errores.clienteId && (
        <Text accessibilityRole="alert" style={styles.error}>
          {errores.clienteId}
        </Text>
      )}

      <Text style={styles.etiqueta}>PLACA</Text>
      <TextInput
        accessibilityLabel="Placa"
        placeholder="SCZ-1234"
        autoCapitalize="characters"
        value={form.placa}
        onChangeText={(v) => cambiar('placa', v)}
        maxLength={12}
        style={styles.entrada}
      />
      {errores.placa && (
        <Text accessibilityRole="alert" style={styles.error}>
          {errores.placa}
        </Text>
      )}

      <Text style={styles.etiqueta}>MARCA</Text>
      <TextInput
        accessibilityLabel="Marca"
        placeholder="Toyota"
        value={form.marca}
        onChangeText={(v) => cambiar('marca', v)}
        style={styles.entrada}
      />
      {errores.marca && (
        <Text accessibilityRole="alert" style={styles.error}>
          {errores.marca}
        </Text>
      )}

      <Text style={styles.etiqueta}>MODELO</Text>
      <TextInput
        accessibilityLabel="Modelo"
        placeholder="Corolla"
        value={form.modelo}
        onChangeText={(v) => cambiar('modelo', v)}
        style={styles.entrada}
      />
      {errores.modelo && (
        <Text accessibilityRole="alert" style={styles.error}>
          {errores.modelo}
        </Text>
      )}

      <Pressable accessibilityRole="button" onPress={guardar} style={styles.boton}>
        <Text style={styles.botonTexto}>{textoBoton}</Text>
      </Pressable>
      <Text style={styles.ayuda}>
        Validar en el móvil no reemplaza la validación en Spring Boot.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 18, paddingBottom: 55 },
  etiqueta: { fontWeight: '800', color: PALETTE.principal, marginTop: 16, marginBottom: 8 },
  opcion: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: PALETTE.borde,
    marginBottom: 7,
  },
  seleccionado: { backgroundColor: PALETTE.acentoClaro, borderColor: PALETTE.acento },
  texto: { color: PALETTE.principal },
  entrada: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    borderWidth: 1,
    borderColor: PALETTE.borde,
    borderRadius: 10,
    color: PALETTE.principal,
  },
  error: { color: '#B42318', marginTop: 5, fontSize: 13 },
  boton: { marginTop: 24, padding: 17, backgroundColor: PALETTE.acento, borderRadius: 12 },
  botonTexto: { textAlign: 'center', color: '#FFFFFF', fontWeight: '800' },
  ayuda: { marginTop: 15, color: PALETTE.secundario, lineHeight: 21 },
});
