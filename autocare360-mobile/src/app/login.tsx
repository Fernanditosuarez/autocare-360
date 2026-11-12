import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../state/AuthContext';
import { PALETTE } from '../theme/palette';

export default function LoginScreen() {
  const router = useRouter();
  const { iniciarSesion } = useAuth();
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [ingresando, setIngresando] = useState(false);

  async function manejarLogin() {
    if (!correo.trim() || !clave.trim()) {
      Alert.alert('Campos requeridos', 'Por favor ingresa tu correo y contraseña.');
      return;
    }

    setIngresando(true);
    const exito = await iniciarSesion(correo.trim(), clave);
    setIngresando(false);

    if (exito) {
      router.replace('/');
    } else {
      Alert.alert('Error de acceso', 'Credenciales inválidas o servidor sin respuesta.');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.contenido} keyboardShouldPersistTaps="handled">
      <Text style={styles.etiqueta}>ACCESO A AUTOCARE 360</Text>
      <Text style={styles.titulo}>Iniciar Sesión</Text>
      <Text style={styles.descripcion}>
        Autenticación segura con JWT y almacenamiento cifrado en SecureStore.
      </Text>

      <Text style={styles.etiquetaCampo}>CORREO ELECTRÓNICO</Text>
      <TextInput
        style={styles.entrada}
        placeholder="profesor@autocare360.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={correo}
        onChangeText={setCorreo}
      />

      <Text style={styles.etiquetaCampo}>CONTRASEÑA</Text>
      <TextInput
        style={styles.entrada}
        placeholder="••••••••"
        secureTextEntry
        value={clave}
        onChangeText={setClave}
      />

      <Pressable style={styles.boton} onPress={manejarLogin} disabled={ingresando}>
        <Text style={styles.textoBoton}>{ingresando ? 'Autenticando...' : 'Entrar al Sistema'}</Text>
      </Pressable>

      <View style={styles.cajaAyuda}>
        <Text style={styles.textoAyuda}>
          💡 Credenciales de prueba:
          {'\n'}• Correo: profesor@autocare360.com
          {'\n'}• Contraseña: admin123
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 20, paddingBottom: 40 },
  etiqueta: { fontSize: 11, fontWeight: '800', color: PALETTE.acento, letterSpacing: 1 },
  titulo: { fontSize: 26, fontWeight: '800', color: PALETTE.principal, marginTop: 4 },
  descripcion: { fontSize: 14, color: PALETTE.secundario, marginTop: 4, marginBottom: 20 },
  etiquetaCampo: { fontWeight: '800', color: PALETTE.principal, marginTop: 14, marginBottom: 6, fontSize: 12 },
  entrada: {
    backgroundColor: '#FFFFFF',
    padding: 13,
    borderWidth: 1,
    borderColor: PALETTE.borde,
    borderRadius: 10,
    color: PALETTE.principal,
  },
  boton: { marginTop: 24, padding: 16, backgroundColor: PALETTE.acento, borderRadius: 12 },
  textoBoton: { textAlign: 'center', color: '#FFFFFF', fontWeight: '800' },
  cajaAyuda: { marginTop: 24, padding: 14, backgroundColor: PALETTE.acentoClaro, borderRadius: 10 },
  textoAyuda: { color: PALETTE.principal, fontSize: 13, lineHeight: 20 },
});
