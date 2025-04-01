# ✅ Informe de Actividad: Autenticación y Gestión de Tareas con React Native

## 📲 Descripción General
Desarrollé una aplicación móvil utilizando **React Native con Expo**, en la que implementé un sistema de **autenticación local** y un **CRUD de tareas** con almacenamiento persistente mediante `expo-sqlite`.

---

## 🔐 Parte 1: Autenticación Local

### Objetivo:
Habilitar el acceso a la app mediante validación de credenciales codificadas manualmente (sin backend).

### Lo que hice:
- Añadí campos de entrada para capturar el correo y la contraseña.
- Validé las credenciales con datos predefinidos:
  - `usuario@ejemplo.com`
  - `password123`
- Utilicé `expo-secure-store` para guardar la sesión del usuario de forma segura.
- Implementé mensajes de error para credenciales inválidas.
- Rediseñé las pantallas de login y registro con un estilo moderno y llamativo: fondo oscuro, efectos de sombra e íconos.

---

## 📂 Parte 2: CRUD de Tareas (expo-sqlite)

### Objetivo:
Crear una interfaz que permita gestionar tareas de manera local y persistente.

### Lo que desarrollé:
- Una interfaz para añadir tareas con input y botón.
- Visualización de tareas usando `FlatList`.
- Funcionalidad para eliminar tareas individuales.
- Guardado de datos en SQLite localmente con `expo-sqlite`.
- Mejoras visuales: tarjetas con glassmorphism, botones con íconos y mensajes de guía cuando no hay tareas registradas.
- Añadí detalles extra para enriquecer la interfaz, como contador de tareas, sugerencias visibles y rediseño completo de los elementos de la lista.

---

## 🛠️ Herramientas y Librerías Utilizadas
- React Native (Expo)
- Expo Secure Store
- Expo SQLite
- React Navigation
- Expo Router
- Ionicons

---

## 🧠 Aprendizajes y Conclusión
Esta actividad fue clave para reforzar mis conocimientos sobre:
- Autenticación y validación en frontend sin backend.
- Almacenamiento local de datos en móviles.
- Manejo de estado con hooks (`useState`, `useEffect`).
- Diseño de interfaces más interactivas y atractivas.
- Organización modular de componentes y navegación.