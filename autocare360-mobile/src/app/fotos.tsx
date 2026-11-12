import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ReturnButton } from '../components/ReturnButton';
import { fotosApi } from '../services/fotosApi';
import { useParking } from '../state/ParkingContext';
import { PALETTE } from '../theme/palette';

export default function FotosScreen() {
  const { vehiculos } = useParking();
  const [vehiculoSeleccionadoId, setVehiculoSeleccionadoId] = useState<number | null>(
    vehiculos.length > 0 ? vehiculos[0].id : null
  );
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [subiendo, setSubiendo] = useState(false);

  async function tomarFoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se requiere acceso a la cámara para capturar fotos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  }

  async function seleccionarDeGaleria() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se requiere acceso a la galería para seleccionar imágenes.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  }

  async function subirFoto() {
    if (!vehiculoSeleccionadoId) {
      Alert.alert('Selección requerida', 'Por favor selecciona un vehículo de la lista.');
      return;
    }
    if (!imageUri) {
      Alert.alert('Imagen requerida', 'Captura una foto con la cámara o elige una de la galería.');
      return;
    }

    setSubiendo(true);
    const exito = await fotosApi.subirFotoVehiculo(vehiculoSeleccionadoId, imageUri);
    setSubiendo(false);

    if (exito) {
      Alert.alert('Éxito', 'La fotografía del vehículo fue enviada correctamente.');
    } else {
      Alert.alert(
        'Modo Local / Demo',
        'Foto preparada exitosamente en la aplicación (subida simulada al servidor).'
      );
    }
  }

  const vehiculoActual = vehiculos.find((v) => v.id === vehiculoSeleccionadoId);

  return (
    <ScrollView contentContainerStyle={styles.contenido}>
      <ReturnButton destinoSiNoHayHistorial="/" />
      <Text style={styles.etiqueta}>PROGRAMACIÓN APLICADA · GUÍA 13</Text>
      <Text style={styles.titulo}>Cámara & Subida de Fotos</Text>
      <Text style={styles.descripcion}>
        Acceso a funciones nativas de Android: permisos de cámara, galería, vista previa y subida multipart.
      </Text>

      {/* Selector de Vehículo */}
      <Text style={styles.subtitulo}>1. Selecciona el Vehículo</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listaVehiculos}>
        {vehiculos.map((v) => (
          <Pressable
            key={v.id}
            onPress={() => setVehiculoSeleccionadoId(v.id)}
            style={[styles.chip, vehiculoSeleccionadoId === v.id && styles.chipActivo]}
          >
            <Text style={[styles.chipTexto, vehiculoSeleccionadoId === v.id && styles.chipTextoActivo]}>
              {v.placa} ({v.marca})
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Acciones de Cámara y Galería */}
      <Text style={styles.subtitulo}>2. Capturar o Seleccionar Imagen</Text>
      <View style={styles.filaBotones}>
        <Pressable style={styles.botonAccion} onPress={tomarFoto}>
          <Text style={styles.textoBoton}>📸 Tomar Foto</Text>
        </Pressable>
        <Pressable style={styles.botonAccionSuave} onPress={seleccionarDeGaleria}>
          <Text style={styles.textoBotonSuave}>🖼️ Galería</Text>
        </Pressable>
      </View>

      {/* Vista Previa de la Imagen */}
      {imageUri ? (
        <View style={styles.cajaPrevia}>
          <Text style={styles.textoPrevia}>Vista Previa de la Fotografía:</Text>
          <Image source={{ uri: imageUri }} style={styles.imagenPrevia} />
          {vehiculoActual && (
            <Text style={styles.pieFoto}>
              Asignada a: {vehiculoActual.placa} - {vehiculoActual.marca} {vehiculoActual.modelo}
            </Text>
          )}

          <Pressable style={styles.botonEnviar} onPress={subirFoto} disabled={subiendo}>
            <Text style={styles.textoBotonEnviar}>
              {subiendo ? 'Enviando imagen...' : '🚀 Subir Fotografía al Servidor'}
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.cajaVacia}>
          <Text style={styles.textoVacio}>No has seleccionado ninguna fotografía aún.</Text>
        </View>
      )}

      <Text style={styles.pieInfo}>
        Las imágenes seleccionadas usan URIs locales temporales de Android antes de ser transferidas al backend mediante peticiones multipart.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenido: { padding: 18, paddingBottom: 40 },
  etiqueta: { fontSize: 11, fontWeight: '800', color: PALETTE.acento, letterSpacing: 1 },
  titulo: { fontSize: 25, fontWeight: '800', color: PALETTE.principal, marginTop: 4 },
  descripcion: { fontSize: 14, color: PALETTE.secundario, marginTop: 4, marginBottom: 16, lineHeight: 20 },
  subtitulo: { fontSize: 15, fontWeight: '800', color: PALETTE.principal, marginTop: 12, marginBottom: 10 },
  listaVehiculos: { gap: 8, paddingBottom: 8 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: PALETTE.borde,
    backgroundColor: '#FFFFFF',
  },
  chipActivo: { backgroundColor: PALETTE.acento, borderColor: PALETTE.acento },
  chipTexto: { fontSize: 13, fontWeight: '700', color: PALETTE.secundario },
  chipTextoActivo: { color: '#FFFFFF' },
  filaBotones: { flexDirection: 'row', gap: 10, marginVertical: 8 },
  botonAccion: { flex: 1, backgroundColor: PALETTE.acento, padding: 14, borderRadius: 10, alignItems: 'center' },
  botonAccionSuave: { flex: 1, backgroundColor: PALETTE.acentoClaro, padding: 14, borderRadius: 10, alignItems: 'center' },
  textoBoton: { color: '#FFFFFF', fontWeight: '800', fontSize: 13 },
  textoBotonSuave: { color: PALETTE.principal, fontWeight: '800', fontSize: 13 },
  cajaPrevia: { marginTop: 16, backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: PALETTE.borde },
  textoPrevia: { fontSize: 13, fontWeight: '700', color: PALETTE.principal, marginBottom: 10 },
  imagenPrevia: { width: '100%', height: 220, borderRadius: 10, resizeMode: 'cover' },
  pieFoto: { marginTop: 8, fontSize: 12, color: PALETTE.secundario, textAlign: 'center', fontWeight: '600' },
  botonEnviar: { marginTop: 16, backgroundColor: PALETTE.exito, padding: 14, borderRadius: 10, alignItems: 'center' },
  textoBotonEnviar: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  cajaVacia: { marginTop: 16, padding: 24, backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: PALETTE.borde, alignItems: 'center' },
  textoVacio: { color: PALETTE.secundario, fontSize: 13, textAlign: 'center' },
  pieInfo: { textAlign: 'center', color: PALETTE.secundario, fontSize: 12, marginTop: 24, lineHeight: 18 },
});
