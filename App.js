import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import Cita from './src/components/Cita';
import Formulario from './src/components/Formulario';

const App = () => {
  //Definir el state de citas
  const [citas, setCitas] = useState([
    {id: '1', paciente: 'Hook', propietario: 'Juan', sintomas: 'No come'},
    {id: '2', paciente: 'Redux', propietario: 'Pedro', sintomas: 'come mucho'},
    {id: '3', paciente: 'Native', propietario: 'Julian', sintomas: 'No duerme'},
  ]);

  //Eliminar paciente del state
  const eliminarPaciente = id => {
    setCitas(citasActuales => {
      return citasActuales.filter(cita => cita.id !== id);
    });
  };

  return (
    <ScrollView>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de Citas</Text>
        <Formulario />
        <Text style={styles.titulo}>
          {citas.length > 0
            ? 'Administra tus citas'
            : 'No hay citas, agrega una'}
        </Text>
        <FlatList
          data={citas}
          renderItem={({item}) => (
            <Cita item={item} eliminarPaciente={eliminarPaciente} />
          )}
          keyExtractor={cita => cita.id}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#AA076B',
  },
  titulo: {
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default App;
