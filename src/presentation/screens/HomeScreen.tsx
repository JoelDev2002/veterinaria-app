import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import CardSolicitud from "../components/CardSolicitud";
import Button from "../components/Button";
import Buscador from "../components/Buscador";
import { ESTADOS_LABELS, FILTROS_ESTADO } from "../../infrastructure/utils/constants";
import { useSolicitudes } from "../../infrastructure/context/SolicitudContext";
import { useLayoutEffect, useState } from "react";
import { Pantallas } from "../navigation/AppNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BotonAgregar from "../components/BotonAgregar";

type HomeScreenProps = NativeStackScreenProps<Pantallas, "Home">;

const HomeScreen= ({navigation}: HomeScreenProps) => {

  const [textoBusqueda,setTextoBusqueda]=useState<string>("");

  function renderBotonAgregar(navigation: HomeScreenProps['navigation']) {
  return <BotonAgregar onPress={() => navigation.navigate("Create")} />
}
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerRight: ()=> renderBotonAgregar(navigation)
    })
  },[navigation])


  const {solicitudes}= useSolicitudes();

  const [filtroActivo,setFiltroActivo]=useState("TODOS")

  const busqueda = textoBusqueda.trim().toLowerCase();
  const solicitudesFiltradas = solicitudes
  .filter((s) => busqueda ==="" || s.clienteNombre.toLowerCase().includes(busqueda))
  .filter((s) => filtroActivo === "TODOS" || s.estado === filtroActivo)


  return(
    <View style={styles.contenedor}>
      <View style={styles.contenedorBuscador}>
        <Buscador
        value={textoBusqueda}
        onChangeText={setTextoBusqueda}
        />
      </View>
      <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filtroEstadoContenedor}
      style={styles.filtroScroll}
      >
        <View style={styles.filtroEstado}>
          {
            FILTROS_ESTADO.map(estado=>(
              <Button
              key={estado}
              texto={ESTADOS_LABELS[estado]}
              activo={filtroActivo === estado}
              onPress={()=>setFiltroActivo(estado)}
              />
            ))
          }
        </View>
      </ScrollView>
      <FlatList
      data={solicitudesFiltradas}
      keyExtractor={item => item.id}
      renderItem={({item})=><CardSolicitud solicitud={item}/>}
      contentContainerStyle={styles.lista}
      ListEmptyComponent={
        <Text style={styles.vacio}>No hay solicitudes registradas</Text>
      }
      />
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  contenedor:{
    flex:1,
    backgroundColor:'#F7F9FE'
  },
  texto:{
    fontSize:20,
    color:'#333'
  },
  contenedorBuscador:{
    width:"100%",
    backgroundColor:"#ffffff",
    paddingHorizontal:15,
    paddingVertical:20,

    shadowColor:"#1a1a1a",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  lista:{
    paddingHorizontal:16,
    paddingBottom:20,
  },
  vacio:{
    textAlign:"center",
    marginTop:40,
    color: "#020202",
    fontSize: 16,
  },
  filtroScroll: {
    flexGrow: 0,
    flexShrink: 0,
  },
  filtroEstadoContenedor: {
    alignItems: 'center',
  },
  filtroEstado:{
    flexDirection:"row",
    paddingHorizontal:10,
    paddingVertical:12,
    gap:6
  },
})