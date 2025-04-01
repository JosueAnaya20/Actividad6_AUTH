import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert, Animated } from "react-native";
import { useSession } from "../../ctx";
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Main = () => {
  const { session, signOut, getTasks, addTask, deleteTask } = useSession();
  const router = useRouter();
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      if (session?.email) {
        try {
          const userTasks = await getTasks(session.email);
          setTasks(userTasks);
        } catch (e) {
          Alert.alert("Error al cargar tareas", e.message);
        }
      }
    };
    loadTasks();
  }, [session]);

  const handleAddTask = async () => {
    if (task && session?.email) {
      try {
        await addTask(session.email, task);
        setTask('');
        const updatedTasks = await getTasks(session.email);
        setTasks(updatedTasks);
      } catch (e) {
        Alert.alert("Error al añadir tarea", e.message);
      }
    } else {
      Alert.alert("Por favor ingresa una tarea.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      const updatedTasks = await getTasks(session.email);
      setTasks(updatedTasks);
    } catch (e) {
      Alert.alert("Error al borrar tarea");
    }
  };

  const TaskItem = ({ item }) => (
    <Animated.View style={styles.taskItem}>
      <View style={styles.taskContent}>
        <Ionicons name="checkmark-circle-outline" size={20} color="#00FFA3" style={{ marginRight: 8 }} />
        <Text style={styles.taskText}>{item.task}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteTask(item.id)}>
        <Ionicons name="trash-outline" size={18} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );

  const taskCount = tasks.length;

  const renderEmpty = () => (
    <>
      <Text style={styles.emptyText}>No hay tareas aún. ¡Agrega una! ✍️</Text>
      <View style={styles.suggestionCard}>
        <Text style={styles.suggestionTitle}>Sugerencias:</Text>
        <Text style={styles.suggestionItem}>✅ Terminar el proyecto</Text>
        <Text style={styles.suggestionItem}>✅ Estudiar para el examen</Text>
        <Text style={styles.suggestionItem}>✅ Ir al gym</Text>
      </View>
    </>
  );

  if (!session) {
    return (
      <View style={styles.container}>
        <Text>No se encontró una sesión, por favor inicia sesión o regístrate</Text>
        <Button title="Iniciar Sesión" onPress={() => router.push('/iniciar-sesion')} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Hola 👋</Text>
        <Text style={styles.subheading}>Bienvenid@, {session.email}</Text>

        <Text style={styles.counter}>Total de tareas: {taskCount}</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="¿Qué harás hoy?"
            placeholderTextColor="#888"
            value={task}
            onChangeText={setTask}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {tasks.length === 0 ? renderEmpty() : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TaskItem item={item} />}
          style={{ marginTop: 20 }}
        />
      )}

      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <Text style={styles.signOutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0f0c29',
  },
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#00BFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00FFA3',
    textAlign: 'center',
    marginBottom: 5,
  },
  subheading: {
    fontSize: 15,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 15,
  },
  counter: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#111',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#8A2BE2',
    marginLeft: 10,
    padding: 12,
    borderRadius: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
    backdropFilter: 'blur(5px)',
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskText: {
    color: '#fff',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#FF4500',
    padding: 8,
    borderRadius: 8,
  },
  signOutButton: {
    backgroundColor: '#DC143C',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  signOutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  emptyText: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    fontStyle: 'italic',
  },
  suggestionCard: {
    marginTop: 20,
    backgroundColor: '#1e1e2f',
    padding: 15,
    borderRadius: 12,
    borderColor: '#444',
    borderWidth: 1,
  },
  suggestionTitle: {
    color: '#00BFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  suggestionItem: {
    color: '#ccc',
    marginBottom: 4,
  },
});

export default Main;
