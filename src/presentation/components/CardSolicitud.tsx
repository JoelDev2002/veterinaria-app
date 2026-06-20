import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Card, Chip } from "react-native-paper";
import { Solicitud } from "../../domain/models/Solicitud";
import { COLOR_ESTADO, COLOR_PRIORIDAD, ESTADOS_LABELS, ICONO_SERVICIO, PRIORIDADES_LABELS } from "../../infrastructure/utils/constants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pantallas } from "../navigation/AppNavigator";
import { LinearGradient } from "expo-linear-gradient";


export default function CardSolicitud ({solicitud}: {solicitud: Solicitud}) {

  const navigation = useNavigation<NativeStackNavigationProp<Pantallas>>();
  return(
      <Card
      style={styles.card}
      elevation={2}
      onPress={() => navigation.navigate("Detail",{solicitudId: solicitud.id})}
      >
        <LinearGradient
        colors={["#A8DADC","#F5F5F5", "#e0e0da"]}
        start={{x:0.0, y:0.0}}
        end={{x:1.0, y:1.0}}
        style={[styles.bgGradient]}>
          <Card.Content style={{paddingHorizontal: 0}}>
        <View style={styles.header}>
          <Text style={styles.nombre}>
            {solicitud.clienteNombre}
          </Text>

          <Chip compact textStyle={{color: "#fff",fontWeight:"bold"}} style={[{backgroundColor:COLOR_ESTADO[solicitud.estado]}]}>
            {ESTADOS_LABELS[solicitud.estado]}
          </Chip>
        </View>

        <View style={styles.row}>
          <MaterialCommunityIcons
            name="paw"
            size={20}
            color="#555"
          />

          <Text style={styles.info}>
            {solicitud.mascotaNombre} ⋅ 
          </Text>
        </View>


        <View style={styles.row}>
          <MaterialCommunityIcons
            name={ICONO_SERVICIO[solicitud.tipoServicio]}
            size={20}
            color="#555"
          />

          <Text style={styles.info}>
            {solicitud.tipoServicio}
          </Text>
        </View>


        <View style={styles.footer}>
          <Text style={styles.fecha}>
            {solicitud.fechaRegistro}
          </Text>

          <View style={styles.estado}>
            <Text style={{
              fontSize:12,
              color: COLOR_PRIORIDAD[solicitud.prioridad]
            }}>{PRIORIDADES_LABELS[solicitud.prioridad]}</Text>

            <View style={[
              styles.punto,
              {backgroundColor:COLOR_PRIORIDAD[solicitud.prioridad]}
            ]} />
          </View>
        </View>
      </Card.Content>
        </LinearGradient>
    </Card>
  )

}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 20,
    // width:350,
    // height:180
  },
  bgGradient:{
    padding:15,
    borderRadius:20,
  },


  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  nombre: {
    fontWeight: "bold",
    color: "#000"
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 10,
  },

  info: {
    color: "#555",
  },

  footer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

  },

  fecha: {
    fontSize: 12,
    color: "#666",
  },

  estado: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  punto: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});