# Guía 13 Móvil — Cámara, Galería, Permisos Nativos de Android y Subida Multipart

## 1. Permisos y Captura de Imágenes (`src/app/fotos.tsx`)
- Configuración de `expo-image-picker` para solicitar permisos nativos de cámara (`requestCameraPermissionsAsync`) y galería (`requestMediaLibraryPermissionsAsync`).
- Lanzamiento de cámara nativa (`launchCameraAsync`) y selector de galería (`launchImageLibraryAsync`) con recorte y vista previa en pantalla.

## 2. Servicio Subida Multipart (`src/services/fotosApi.ts`)
- Creación del servicio para el envío de fotografías de vehículos mediante `FormData` (subida multipart) al backend de Spring Boot.
- Inyección del header de autorización con token JWT obtenido de `SecureStore`.
