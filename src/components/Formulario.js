/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import shortid from 'shortid';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Formulario = ({citas, setCitas, setMostrarForm}) => {
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [contacto, setContacto] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarFecha = date => {
    const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
    setFecha(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };

  const confirmarHora = time => {
    const opciones = {hour: 'numeric', minute: '2-digit'};
    setHora(time.toLocaleTimeString('es-US', opciones));
    hideTimePicker();
  };

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Todos los campos son obligatorios', [
      {
        text: 'OK',
      },
    ]);
  };

  const crearNuevaCita = () => {
    //VALIDAR
    if (
      paciente.trim() === '' ||
      propietario.trim() === '' ||
      contacto.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      sintomas.trim() === ''
    ) {
      mostrarAlerta();
      return;
    }

    //crear cita
    const cita = {paciente, propietario, contacto, fecha, hora, sintomas};
    cita.id = shortid.generate();

    //agregar cita al state
    const citasNuevas = [...citas, cita];
    setCitas(citasNuevas);

    //ocultar Formulario
    setMostrarForm(false);

    //resetear form
  };

  return (
    <>
      <ScrollView>
        <View style={styles.formulario}>
          <Text style={styles.label}>Paciente: </Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setPaciente(texto)}
          />
        </View>
        <View style={styles.formulario}>
          <Text style={styles.label}>Dueño: </Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setPropietario(texto)}
          />
        </View>
        <View style={styles.formulario}>
          <Text style={styles.label}>Contacto: </Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => setContacto(texto)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.formulario}>
          <Text style={styles.label}>Fecha:</Text>
          <Button title="Seleccionar fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale="es_ES"
            headerTextIOS="Elige una fecha"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text style={styles.txtFechaHora}>{fecha}</Text>
        </View>
        <View style={styles.formulario}>
          <Text style={styles.label}>Hora:</Text>
          <Button title="Seleccionar hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            locale="es_ES"
            headerTextIOS="Elige una hora"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
            is24Hour
          />
          <Text style={styles.txtFechaHora}>{hora}</Text>
        </View>
        <View style={styles.formulario}>
          <Text style={styles.label}>Sintomas: </Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={texto => setSintomas(texto)}
          />
        </View>

        <View style={styles.formulario}>
          <TouchableOpacity
            onPress={() => crearNuevaCita()}
            style={styles.btnSubmit}>
            <Text style={styles.textSubmit}>Agregar cita</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    marginTop: 20,
    fontSize: 17,
    fontWeight: 'bold',
  },
  input: {
    marginTop: 8,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  formulario: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  txtFechaHora: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Formulario;
