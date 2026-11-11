import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { validarCliente, type ClienteFormErrores, type ClienteFormValue } from '../domain/validaciones';
import { PALETTE } from '../theme/palette';

type Props = {
  valorInicial?: ClienteFormValue;
  textoBoton?: string;
  alGuardar: (valor: ClienteFormValue) => void;
};

const VACIO: ClienteFormValue = { nombre: '', correo: '', activo: true };

export function ClienteForm({
  valorInicial = VACIO,
  textoBoton = 'Guardar cliente',
  alGuardar,
}: Props) {
  const [form, setForm] = useState<ClienteFormValue>(valorInicial);
  const [errores, setErrores] = useState<ClienteFormErrores>({});
  const [intentado, setIntentado] = useState(false);

  function cambiar<K extends keyof ClienteFormValue>(clave: K, valor: ClienteFormValue[K]) {
    setForm((actual) => ({ ...actual, [clave]: valor }));
    if (intentado) setErrores({});
  }

  function guardar() {
    setIntentado(true);
    const encontrados = validarCliente(form);
    setErrores(encontrados);
    if (Object.keys(encontrados).length !== 0) return;

    alGuardar({
      nombre: form.nombre.trim(),
      correo: form.correo.trim().toLowerCase(),
      activo: form.activo,
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.contenido} keyboardShouldPersistTaps="handled">
      <Text style={styles.etiqueta}>NOMBRE COMPLETO</Text>
      <TextInput
        accessibilityLabel="Nombre completo"
        placeholder="Ej. Carlos Mendoza"
        value={form.nombre}
        onChangeText={(v) => cambiar('nombre', v)}
        style={styles.entrada}
      />
      {errores.nombre && <Text accessibilityRole="alert" style={styles.error}>{errores.nombre}</Text>}

      <Text style={styles.etiqueta}>CORREO ELECTRÓNICO</Text>
      <TextInput
        accessibilityLabel="Correo electrónico"
        placeholder="carlos@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.correo}
        onChangeText={(v) => cambiar('correo', v)}
        style={styles.entrada}
      />
      {errores.correo && <Text accessibilityRole="alert" style={styles.error}>{errores.correo}</Text>}

      <View style={styles.filaSwitch}>
        <Text style={styles.etiquetaSwitch}>CLIENTE ACTIVO EN SISTEMA</Text>
        <Switch
          value={form.activo}
          onValueChange={(v) => cambiar('activo', v)}
          trackColor={{ false: PALETTE.borde, true: PALETTE.acento }}
        />
      </View>

      <Pressable accessibilityRole="button" onPress={guardar} style={styles.boton}>
        <Text style={styles.botonTexto}>{textoBoton}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 18, paddingBottom: 40 },
  etiqueta: { fontWeight: '800', color: PALETTE.principal, marginTop: 16, marginBottom: 8 },
  entrada: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    borderWidth: 1,
    borderColor: PALETTE.borde,
    borderRadius: 10,
    color: PALETTE.principal,
  },
  error: { color: '#B42318', marginTop: 5, fontSize: 13 },
  filaSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  etiquetaSwitch: { fontWeight: '800', color: PALETTE.principal, fontSize: 13 },
  boton: { marginTop: 24, padding: 17, backgroundColor: PALETTE.acento, borderRadius: 12 },
  botonTexto: { textAlign: 'center', color: '#FFFFFF', fontWeight: '800' },
});
