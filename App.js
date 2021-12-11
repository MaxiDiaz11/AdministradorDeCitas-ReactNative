import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Cita from './src/components/Cita';

const App = () => {
  //Definir el state de citas
  const [citas, setCitas] = useState([
    {id: '1', paciente: 'Hook', propietario: 'Juan', sintomas: 'No come'},
    {id: '2', paciente: 'Redux', propietario: 'Pedro', sintomas: 'come mucho'},
    {id: '3', paciente: 'Native', propietario: 'Julian', sintomas: 'No duerme'},
  ]);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Administrador de Citas</Text>
      <FlatList
        data={citas}
        renderItem={({item}) => <Cita item={item} />}
        keyExtractor={cita => cita.id}
      />
    </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default App;
