import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useSession } from '../ctx';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { usePushNotifications } from '../components/useNotifications'; // Asegúrate que el path sea correcto
import * as Notifications from 'expo-notifications';

export default function SignUp() {
  const { signUp } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignUp = async () => {
    let isValid = true;

    if (!email) {
      setEmailError('El email es requerido');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Formato de email inválido');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('La contraseña es requerida');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Debe tener al menos 6 caracteres');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      try {
        await signUp(email, password);
        Alert.alert('Registro Exitoso', 'Serás redireccionado.');
      } catch (error) {
        Alert.alert('Error al Registrarse', error.message);
      }
    } else {
      Alert.alert("Por favor, corrige los errores para continuar.");
    }
  };

  const handleSignInPress = () => {
    router.push('/iniciar-sesion');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Crear Cuenta</Text>

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
            onBlur={() => {
              if (!email) {
                setEmailError('El email es requerido');
              } else if (!validateEmail(email)) {
                setEmailError('Formato de email inválido');
              } else {
                setEmailError('');
              }
            }}
          />
        </View>
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#ccc" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#bbb"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            onBlur={() => {
              if (!password) {
                setPasswordError('La contraseña es requerida');
              } else if (password.length < 6) {
                setPasswordError('Debe tener al menos 6 caracteres');
              } else {
                setPasswordError('');
              }
            }}
          />
        </View>
        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Crear Cuenta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleSignInPress}>
          <Text style={styles.secondaryButtonText}>¿Ya tienes cuenta? Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f2027',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    padding: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ffffff22',
    shadowColor: '#00FFA3',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: '600',
    color: '#00FFA3',
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
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
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
  error: {
    color: 'red',
    marginBottom: 10,
    marginTop: -10,
    marginLeft: 5,
    fontSize: 13,
  },
  button: {
    backgroundColor: '#00FFA3',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#00FFA3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
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
    color: '#bbb',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});
