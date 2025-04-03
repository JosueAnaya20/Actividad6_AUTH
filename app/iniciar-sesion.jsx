import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useSession } from '../ctx';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { usePushNotifications } from '../components/useNotifications'; // Asegúrate que el path sea correcto
import * as Notifications from 'expo-notifications';

export default function SignIn() {
  const { signIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { expoPushToken } = usePushNotifications();

  const handleSignIn = async () => {
    try {
      await signIn(email, password);

      // ✅ Notificación después del login exitoso con mensaje extenso
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Inicio de sesión exitoso ✅',
          body: `¡Bienvenido, ${email}! Ya puedes comenzar a registrar tus actividades, organizar tu lista de tareas y llevar el control de tu productividad como todo un pro. 💪📝`,
        },
        trigger: null,
      });

    } catch (error) {
      Alert.alert('Error al Iniciar Sesión', error.message);
    }
  };

  const handleSignUpPress = () => {
    router.push('/registrarse');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Inicia Sesión</Text>

        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} color="#ccc" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#bbb"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#ccc" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#bbb"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleSignUpPress}>
          <Text style={styles.secondaryButtonText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0c29',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffffff22',
  },
  heading: {
    fontSize: 26,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 30,
    textAlign: 'center',
    letterSpacing: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#444',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#fff',
  },
  button: {
    backgroundColor: '#00FFF7',
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: '#00FFF7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 20,
  },
  secondaryButtonText: {
    color: '#aaa',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});
