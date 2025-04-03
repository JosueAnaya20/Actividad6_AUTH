# 📱 Implementación de Notificaciones en Proyecto de Login con Expo

## ✨ Actividad: Integración de Expo Notifications

En esta actividad integré notificaciones locales usando **Expo Notifications** dentro de un proyecto de autenticación desarrollado previamente con **React Native y Expo Router**. La funcionalidad principal fue **mostrar notificaciones motivadoras** al iniciar sesión y al eliminar tareas, conectando todo con un diseño moderno y funcional.

---

## 🛠️ Requisitos previos cumplidos

- ✅ Proyecto de autenticación previo con inicio de sesión y registro.
- ✅ Cuenta activa en [Expo](https://expo.dev/).
- ✅ EAS CLI instalado globalmente (`npm install -g eas-cli`).
- ✅ Proyecto configurado con `eas build:configure` para obtener el Project ID.
- ✅ Uso de `expo-secure-store`, `expo-sqlite` y `axios` para persistencia y llamadas HTTP.

---

## 🔐 Autenticación con SecureStore + SQLite

- Implementé el inicio de sesión y registro con una base de datos SQLite (`expo-sqlite`).
- Al iniciar sesión, los datos del usuario se almacenan de forma segura usando `expo-secure-store`.

---

## 📦 Instalación y configuración de notificaciones

1. Instalé las dependencias necesarias:

```bash
expo install expo-notifications expo-device expo-constants
```

2. Creé un **custom hook** llamado `usePushNotifications.ts` que:
   - Solicita permisos.
   - Obtiene el token de notificación de Expo.
   - Configura los listeners para recibir notificaciones incluso si la app está abierta.

```ts
// usePushNotifications.ts
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useEffect, useRef, useState } from 'react';

export const usePushNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState();
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notificación recibida', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Respuesta a la notificación', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('No se pudieron obtener permisos de notificación');
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    return token;
  }

  return { expoPushToken };
};
```

---

## 🔔 Notificaciones locales implementadas

### ✅ Inicio de sesión exitoso

Después de un login exitoso, se dispara una notificación motivadora:

```ts
await Notifications.scheduleNotificationAsync({
  content: {
    title: 'Inicio de sesión exitoso ✅',
    body: `¡Bienvenido, Omar! Ya puedes comenzar a registrar tus actividades, organizar tu lista de tareas y llevar el control de tu productividad como todo un pro. 💪📝`,
  },
  trigger: null,
});
```

📍 **Ubicación:** Componente `SignIn.jsx` dentro del evento `handleSignIn`.

---

### 🗑️ Eliminación de tarea

Cada vez que el usuario elimina una tarea, se envía una notificación local:

```ts
await Notifications.scheduleNotificationAsync({
  content: {
    title: 'Se eliminó una tarea 🗑️',
    body: 'Acabas de eliminar una actividad de tu lista. ¡Sigue así y mantén tu productividad al máximo!',
  },
  trigger: null,
});
```

📍 **Ubicación:** Componente `Main.jsx` en la función `handleDeleteTask`.

---

## ⚙️ Configuración futura de la API (opcional)

> Aunque en esta fase solo trabajé con **notificaciones locales**, se dejó preparado el hook y el manejo del token para eventualmente:

- Enviar el Expo Push Token al backend.
- Crear un endpoint `/notifications` protegido con JWT (`verifyToken`) en la API.
- Usar el SDK de Expo Server para enviar **notificaciones push reales** desde el servidor.

---

## 💃 Tabs y estructura de navegación

Se utilizó **expo-router** para navegación, con posibilidad de usar tabs:

- Tab 1: Notificaciones locales.
- Tab 2: Notificaciones push futuras vía API.

---

## 📁 Estructura del proyecto

```
components/
├— useNotifications.ts       # Hook de configuración de Expo Notifications
screens/
├— SignIn.jsx                # Login con notificación de bienvenida
└— Main.jsx                  # Lista de tareas con notificaciones al eliminar
ctx/
└— index.js                  # Contexto de sesión y funciones SQLite
```

---

## 📌 Detalles adicionales

- Se utilizaron íconos de `Ionicons`.
- Estilo oscuro con tarjetas, sombras y efectos visuales modernos.
- Todas las pruebas fueron realizadas en **dispositivo físico**.

---

## 📓 Recursos usados

- [Documentación oficial de Expo Notifications](https://docs.expo.dev/push-notifications/overview/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [Demo API y Auth App base](https://github.com/efraindiaz/demo-api)

---

## ✅ Conclusión

La integración de **Expo Notifications** con el sistema de login fue sencilla y efectiva.  
Se logró mostrar mensajes personalizados al usuario tras iniciar sesión y al realizar acciones clave, mejorando la experiencia con feedback visual y motivacional.

```bash
expo start --dev-client
```

---