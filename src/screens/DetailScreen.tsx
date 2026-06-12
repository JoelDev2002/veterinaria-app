import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Pantallas } from "../navigation/AppNavigator";
import { useSolicitudes } from "../context/SolicitudContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Chip } from "react-native-paper";
import { COLOR_ESTADO, COLOR_PRIORIDAD, ICONO_SERVICIO } from "../utils/constants";
import { useState } from "react";


type detailScreenProps = NativeStackScreenProps<Pantallas, "Detail">;

const DetailScreen= ({route, navigation}: detailScreenProps) => {
  const {solicitudId} = route.params;
  const {solicitudes} = useSolicitudes();


  const solicitud = solicitudes.find((s) => s.id === solicitudId);

  const [formEdit, setFormEdit] = useState({
    telefono: solicitud?.telefono,
    estado: solicitud?.estado,
    descripcion: solicitud?.descripcion
  })

  if (!solicitud) return <Text>No encontrada</Text>;

  return(
    <View style={styles.contenedor}>
      {/* HEADER — ID y ESTADO */}
      <View style={styles.headerRow}>
        <Text style={styles.label}>ID DE SOLICITUD</Text>
        <Chip
          compact
          style={{ backgroundColor: COLOR_ESTADO[solicitud.estado] }}
          textStyle={{ color: "#fff", fontWeight: "bold" }}
          icon="chevron-down"
        >
          {solicitud.estado}
        </Chip>
      </View>

      {/* ID BOX */}
      <View style={styles.idBox}>
        <Text style={styles.idTexto}>{solicitud.id.slice(0,13)}</Text>
      </View>

      {/* FECHA */}
      <View style={styles.fechaRow}>
        <MaterialCommunityIcons name="calendar-outline" size={16} color="#888" />
        <Text style={styles.fechaTexto}>
          Registrado el {solicitud.fechaRegistro}
        </Text>
      </View>
      {/* INFORMACION DE CONTACTO */}
      <View style={styles.informacionContenedor}>
        <View style= {styles.titulo}>
          <MaterialCommunityIcons
          name="account-outline"
          size={25}
          color="#356668"
          />
          <Text style={styles.label}>Informacion de Contacto</Text>
        </View>
        <View style={styles.contenedorInfo}>
          <View >
            <Text style={styles.minilabel}>MASCOTA</Text>
            <Text>{solicitud.mascotaNombre}</Text>
          </View>
          <View>
            <Text style={styles.minilabel}>CLIENTE</Text>
            <Text>{solicitud.clienteNombre}</Text>
          </View>
        </View>
        <View >
          <Text style={styles.minilabel}>TELÉFONO</Text>
          <View style={styles.contactoContenedorTelefono}>
            <MaterialCommunityIcons
            name="phone"
            size={20}
            color="#888"
            />
            <Text>+51 {solicitud.telefono}</Text>
          </View>
        </View>
      </View>
      {/* DETALLES DEL SERVICIO */}
      <View style={styles.informacionContenedor}>
        <View style={styles.titulo}>
          <MaterialCommunityIcons
          name="medical-bag"
          size={25}
          color="#356668"
          />
          <Text style={styles.label}>Detalles del Servicio</Text>
        </View>
        <View style={styles.espacio}>
          <Text style={styles.minilabel}>TIPO DE SERVICIO</Text>
          <View style={styles.tipoServicio}>
            <MaterialCommunityIcons
            name={ICONO_SERVICIO[solicitud.tipoServicio]}
            size={25}
            />
            <Text style={styles.texto}>{solicitud.tipoServicio}</Text>
          </View>
          
          <View style={styles.espacio}>
            <Text style={styles.minilabel}>PRIORIDAD</Text>
            <View style={{flexDirection:"row", alignItems:"center", gap:10}}>
              <View style={[styles.punto,{backgroundColor:COLOR_PRIORIDAD[solicitud.prioridad]}]}/>
              <Text style={{color:COLOR_PRIORIDAD[solicitud.prioridad],fontWeight:"bold"}}>{solicitud.prioridad}</Text>
            </View>
          </View>
          <View style={styles.espacio}>
            <Text style={styles.minilabel}>DESCRIPCIÓN</Text>

            <View style={styles.descripcion}>
              <Text>{solicitud.descripcion}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{marginTop:40}}>
        <TouchableOpacity
        style={styles.botonEditar}
        onPress={()=> navigation.navigate("Edit",{solicitudId:solicitud.id})}
        >
          <Text style={{color:"#fff",fontSize:17, fontWeight:600}}>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DetailScreen;


const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#F7F9FE",
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#356668",
    letterSpacing: 1,
  },
  idBox: {
    borderWidth: 1.5,
    borderColor: "#98ccd1",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignSelf: "flex-start",
    backgroundColor: "#E8F3F4",
    marginBottom: 14,
  },
  idTexto: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#356668",
    letterSpacing: 1,
  },
  fechaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  fechaTexto: {
    fontSize: 13,
    color: "#888",
  },

  informacionContenedor:{
    marginTop:15,
    backgroundColor:"#fff",
    borderRadius:15,
    borderColor:"#E6E8E9",
    borderWidth:2,
    flexDirection:"column",
    padding:15
  },
  titulo:{
    flexDirection:"row",
    gap:10,
    alignItems:"center"
  },
  minilabel:{
    fontSize:12,
    color:"#6B7280",
    marginBottom:5,
    fontWeight: 500
  },
  contenedorInfo:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginVertical:20
  },
  contactoContenedorTelefono:{
    flexDirection:"row",
    gap:5,
    alignItems:"center",
  },
  tipoServicio:{
    flexDirection:"row",
    alignItems:"center",
    gap:10
  },
  texto:{
    fontSize:17,
    color:"#000",
    fontWeight:"bold"
  },
  punto:{
    height:8,
    width:8,
    borderRadius:50
  },
  descripcion:{
    backgroundColor:"#ddeef0",
    padding:15,
    height:"auto",
    borderRadius:15,
  },
  espacio:{
    marginTop:20
  },
  botonEditar:{
    width:120,
    height:40,
    borderRadius:15,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#000",
  }
});