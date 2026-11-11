# Guía 01 Móvil — Entorno de Desarrollo y Primera Aplicación (AutoCare 360)

## 1. Configuración del Entorno Móvil
- Instalación y verificación de Node.js, npm, Android SDK y Android Debug Bridge (`adb`).
- Configuración de la variable de entorno `ANDROID_HOME` y adición de `platform-tools` al `PATH`.
- Encendido y vinculación exitosa con el emulador Android (AVD) de Android Studio.

## 2. Creación del Proyecto Móvil
- Generación del proyecto `autocare360-mobile` mediante Expo CLI con la plantilla `blank-typescript`.
- Instalación de la biblioteca `react-native-safe-area-context` para la gestión de áreas seguras (muescas y barras de sistema).

## 3. Primera Pantalla e Interacción Táctica
- Implementación de la interfaz inicial en `App.tsx` con componentes nativos (`SafeAreaView`, `ScrollView`, `Text`, `View`, `Pressable`).
- Control de estado local interactivo mediante `useState` para alternar entre la vista del módulo de Clientes y Vehículos.
- Verificación del ciclo de desarrollo y recarga en tiempo real (*Fast Refresh*) desde Metro Bundler.