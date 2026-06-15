import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView} from "react-native";
import { Estado, Prioridad, Solicitud, TipoServicio } from "../models/Solicitud";
import uuid from "react-native-uuid"
import { Button, TextInput } from "react-native-paper";
import { COLOR_PRIORIDAD, PRIORIDADES, TIPOS_SERVICIO } from "../utils/constants";
import { Picker } from "@react-native-picker/picker";
import { useSolicitudes } from "../context/SolicitudContext";
import { Pantallas } from "../navigation/AppNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { validarNombre, validarTelefono } from "../utils/validators";


type createScreenProps = NativeStackScreenProps<Pantallas, "Create">;

const CreateScreen= ({navigation}: createScreenProps ) => {

  const [errores, setErrores] =useState({
    clienteNombre: null as string | null,
    telefono: null as string | null,
  })



  const {agregar} = useSolicitudes()

  const [form, setForm]= useState({
    clienteNombre:"",
    telefono:"",
    mascotaNombre:"",
    tipoServicio:"" as TipoServicio| "",
    prioridad:"" as Prioridad |"",
    descripcion:""
  })

  const handleChange = (campo: string, valor: string) => {
    setForm(prev => ({ ...prev, [campo]: valor }));
  };

  const handleGuardar=()=>{

    const errorNombre = validarNombre(form.clienteNombre);
    const errorTelefono = validarTelefono(form.telefono);

    setErrores({
      clienteNombre: errorNombre,
      telefono: errorTelefono,
    });


    if (errorNombre || errorTelefono) return;

    const nuevaSolicitud: Solicitud={
      id: uuid.v4() as string,
      fechaRegistro: new Date().toLocaleString("es-PE",{
      timeZone:"America/Lima"
    }),
      estado:Estado.PENDIENTE,
      prioridad:form.prioridad as Prioridad,
      tipoServicio:form.tipoServicio as TipoServicio,
      clienteNombre:form.clienteNombre,
      telefono: form.telefono,
      mascotaNombre: form.mascotaNombre,
      descripcion: form.descripcion,

    }
    agregar(nuevaSolicitud)
    navigation.goBack();
  }

  return(
    <KeyboardAvoidingView style={{flex:1}} behavior="padding">
      <ScrollView contentContainerStyle={styles.contenedor}>
      <Text style={styles.label}>NOMBRE CLIENTE</Text>
      <TextInput
      mode="outlined"
      placeholder="Ej. Juan Quispe"
      placeholderTextColor="#666"
      textColor="#000"
      value={form.clienteNombre}
      onChangeText={(v)=>handleChange("clienteNombre", v)}
      outlineColor="#ccc"
      activeOutlineColor="#a8dadc"
      style={styles.input}
      error={!!errores.clienteNombre}
      />
      {errores.clienteNombre && (
        <Text style={styles.error}>{errores.clienteNombre}</Text>
      )}


      <Text style={styles.label}>TELÉFONO</Text>
      <TextInput
        mode="outlined"
        placeholder="987 654 321"
        placeholderTextColor="#666"
        textColor="#000"
        value={form.telefono}
        onChangeText={(v) => handleChange("telefono", v)}
        keyboardType="phone-pad"
        outlineColor="#ccc"
        activeOutlineColor="#a8dadc"
        style={styles.input}
        error={!!errores.telefono}
      />
      {errores.telefono && (
        <Text style={styles.error}>{errores.telefono}</Text>
      )}

      <Text style={styles.label}>NOMBRE MASCOTA</Text>
      <TextInput
        mode="outlined"
        placeholder="Ej. firulais"
        placeholderTextColor="#666"
        textColor="#000"
        value={form.mascotaNombre}
        onChangeText={(v) => handleChange("mascotaNombre", v)}
        outlineColor="#ccc"
        activeOutlineColor="#a8dadc"
        style={styles.input}
      />

      <Text style={styles.label}>TIPO DE SERVICIO</Text>
      <View style={styles.pickerContenedor}>
        <Picker
        selectedValue={form.tipoServicio}
        onValueChange={v => handleChange("tipoServicio", v)}
        style={styles.picker}
        >
          <Picker.Item label="Seleccionar servicio" value=""/>
          {
            TIPOS_SERVICIO.map((servicio)=>(
              <Picker.Item key={servicio} label={servicio} value={servicio}/>
            ))
          }
        </Picker>
      </View>

      <Text style={styles.label}>PRIORIDAD</Text>
      <View style={styles.prioridadContenedor}>
        {PRIORIDADES.map((p) => (
          <TouchableOpacity
            key={p}
            onPress={() => handleChange("prioridad", p)}
            style={[
              styles.prioridadBoton,
              form.prioridad === p && { backgroundColor: COLOR_PRIORIDAD[p], borderColor: COLOR_PRIORIDAD[p] }
            ]}
          >
            <View style={[styles.circulo, { backgroundColor:  COLOR_PRIORIDAD[p]}]} />
            <Text style={[
              styles.prioridadTexto,
              form.prioridad === p && { color: "#fff", fontWeight: "bold" }
            ]}>
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>DESCRIPCIÓN</Text>
      <TextInput
        mode="outlined"
        placeholder="Detalles de la condición o motivo de la visita..."
        placeholderTextColor="#666"
        value={form.descripcion}
        onChangeText={(v) => handleChange("descripcion", v)}
        multiline
        numberOfLines={4}
        outlineColor="#ccc"
        activeOutlineColor="#a8dadc"
        style={[styles.input, styles.inputMultiline]}
      />

      {/* BOTÓN GUARDAR */}
      <Button
        mode="contained"
        onPress={handleGuardar}
        style={styles.botonGuardar}
        buttonColor="#1d7a8a"
        labelStyle={{ fontSize: 17, fontWeight: "bold" , color:"#fff"}}
      >
        Guardar solicitud
      </Button>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default CreateScreen;

const styles= StyleSheet.create({
  contenedor: {

    padding: 20,
    backgroundColor: "#F7F9FE",
  },
  inputMultiline: {
    minHeight: 100,
  },
  label:{
    fontSize:12,
    fontWeight: "bold",
    color: "#888",
    marginBottom: 4,
    marginTop: 16,
    letterSpacing: 1
  },
  input:{
    backgroundColor:"#F7FBFD"
  },
  pickerContenedor:{
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "#fff",
    marginTop: 4,
  },
  picker: {
    color: "#333",
  },
  prioridadContenedor: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  prioridadBoton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  circulo: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  prioridadTexto: {
    fontSize: 13,
    color: "#555",
  },
  botonGuardar: {
    marginTop: 30,
    borderRadius: 15,
    paddingVertical: 4,
  },
  error: {
  color: "#e63946",
  fontSize: 12,
  marginTop: 2,
  marginLeft: 4,
  },
  btnAtras: {
  padding: 8,
  alignSelf: "flex-start",
  marginBottom: 8,
}
})