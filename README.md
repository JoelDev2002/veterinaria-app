# VetApp 🐾 — Gestión de Solicitudes Veterinarias
 
Aplicación móvil desarrollada en React Native con Expo para gestionar solicitudes de atención de una clínica veterinaria.
 
---
 
## 📋 Descripción
 
VetApp permite registrar y gestionar solicitudes de atención veterinaria (consultas, vacunación, emergencias y grooming), reemplazando el registro informal por WhatsApp o llamadas telefónicas.
 
---
 
## 👥 Integrantes
 
- Integrante 1 — JOEL ANDERSON MACHACA NINA
- Integrante 2 — WALTER MALPARTIDA SOTO
- Integrante 3 — MARICIELO FERNANDA OCHOA GARCIA
---
 
## ✅ Requisitos previos
 
| Herramienta | Versión recomendada |
|---|---|
| Node.js | v18 o superior |
| npm | v9 o superior |
| Expo CLI | npx (sin instalación global) |
| Android Studio | Última versión estable |
| JDK | 17 |
 
---
 
## 🚀 Instalación
 
1. Clona el repositorio:
```bash
git clone https://github.com/JoelDev2002/veterinaria-app.git
cd veterinaria-app
```
 
2. Instala las dependencias:
```bash
npm install
```
 
---
 
## ▶️ Ejecución en desarrollo
 
### Con Expo Go (más rápido)
```bash
npx expo start
```
Escanea el QR con la app Expo Go en tu celular.
 
### En emulador Android
```bash
npx expo start
# Presiona "a" para abrir en emulador Android
```
 
---
 
## 📦 Generar APK (producción)
 
```bash
# Paso 1 — Generar carpeta nativa
npx expo prebuild --platform android
 
# Paso 2 — Compilar APK
cd android
.\gradlew assembleRelease   # Windows
./gradlew assembleRelease   # Mac/Linux
```
 
El APK quedará en:
```
android/app/build/outputs/apk/release/app-release.apk
```
 
---
 
## 🔄 Cómo probar el flujo CRUD
 
### Crear solicitud
1. Abre la app → pantalla principal (Listado)

2. Toca el botón **+** (esquina superior derecha)
3. Completa el formulario: cliente, mascota, tipo de servicio, prioridad, descripción
4. Toca **Guardar** → la solicitud aparece en el listado
### Leer / Ver detalle
1. En el listado toca cualquier tarjeta de solicitud
2. Se muestra el detalle completo: datos del cliente, mascota y servicio
### Actualizar solicitud
1. Desde el detalle toca **Editar**
2. Modifica el estado, prioridad o descripción
3. Toca **Guardar cambios** → los cambios se reflejan en el listado
### Eliminar solicitud
1. Desde la pantalla de edición toca **Eliminar solicitud**
2. Confirma en el modal de confirmación
3. La solicitud desaparece del listado
### Filtrar solicitudes
1. En el listado usa los chips: **TODOS / PENDIENTE / EN ATENCIÓN / FINALIZADO**
2. Usa el buscador para filtrar por nombre de cliente o mascota
---
 
## 🏗️ Arquitectura del proyecto
 
```
src/
├── screens/       # Pantallas principales (Home, Create, Detail, Edit)
├── components/    # Componentes reutilizables (SolicitudCard, etc.)
├── context/       # Estado global con Context API + useReducer
├── models/        # Tipos y estructuras de datos (Solicitud)
├── navigation/    # Configuración de navegación (AppNavigator)
├── services/      # Capa de servicios (preparada para API futura)
└── utils/         # Constantes, colores, iconos, validaciones
```
 
### Estado global
La app usa **Context API + useReducer** para manejar el CRUD en memoria:
 
- `SolicitudContext.tsx` — provee el estado global a toda la app
- `solicitudReducer.ts` — maneja las acciones: AGREGAR, EDITAR, ELIMINAR, CAMBIAR_ESTADO
### Hooks utilizados
- `useState` — manejo de formularios
- `useEffect` — carga de datos iniciales al arrancar la app
- `useReducer` — gestión del estado global
- `useContext` — acceso al estado desde cualquier pantalla
---
 
## 📱 Tecnologías usadas
 
- React Native + Expo
- TypeScript
- React Navigation (native-stack)
- React Native Paper (componentes UI)
- Context API + useReducer (estado global)
---
 
## 📸 Capturas de pantalla
 
| Listado | Crear | Detalle | Editar |
|---|---|---|---|
| ![Listado](./assets/screenshots/captura-home.png) | ![Crear](./assets/screenshots/captura-form.png) | ![Detalle](./assets/screenshots/captura-detalle.png) | ![Editar](./assets/screenshots/captura-edit-delete.png) |
 