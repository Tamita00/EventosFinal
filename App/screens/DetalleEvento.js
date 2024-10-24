import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import eventsApi from '../api/eventsApi';

const DetalleEvento = ({ route, navigation }) => {
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventData = await eventsApi.getEventDetails(eventId);
        setEvent(eventData);
      } catch (error) {
        console.error('Error al cargar los detalles del evento:', error);
        Alert.alert('Error', 'No se pudieron cargar los detalles del evento.');
      }
    };
    fetchEventDetails();
  }, [eventId]);

  const handleDelete = async () => {
    try {
      // Implementa la lógica para eliminar el evento aquí
      Alert.alert('Evento eliminado', 'El evento ha sido eliminado con éxito.');
      navigation.goBack();
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
      Alert.alert('Error', 'Hubo un problema al eliminar el evento.');
    }
  };

  if (!event) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.name}</Text>
      <Text>Fecha: {event.date}</Text>
      <Text>Ubicación: {event.location}</Text>

      <Button title="Eliminar Evento" onPress={handleDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f4f6f7', // Fondo claro
    borderRadius: 15,
    alignItems: 'center', // Centrar contenido
  },
  title: {
    fontSize: 30, // Tamaño de fuente más grande
    fontWeight: '900', // Fuente más gruesa
    marginBottom: 20,
    color: '#2c3e50', // Color oscuro para el título
    textTransform: 'uppercase', // Texto en mayúsculas
    textAlign: 'center', // Centrar texto
  },
});

export default DetalleEvento;
