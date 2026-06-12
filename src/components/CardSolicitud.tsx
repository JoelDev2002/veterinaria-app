import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Card, Chip } from "react-native-paper";
import { Solicitud } from "../models/Solicitud";
import { COLOR_ESTADO, COLOR_PRIORIDAD, ICONO_SERVICIO } from "../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";


export default function CardSolicitud ({solicitud}: {solicitud: Solicitud}) {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return(
    <>
      <Card
      style={styles.card}
      elevation={2}
      onPress={() => navigation.navigate("Detail",{solicitudId: solicitud.id})}
      >
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.nombre}>
            {solicitud.clienteNombre}
          </Text>

          <Chip compact style={{backgroundColor:COLOR_ESTADO[solicitud.estado]}}>
            {solicitud.estado}
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
              // color: COLOR_PRIORIDAD[solicitud.prioridad]
            }}>{solicitud.prioridad}</Text>

            <View style={[
              styles.punto,
              {backgroundColor:COLOR_PRIORIDAD[solicitud.prioridad]}
            ]} />
          </View>
        </View>
      </Card.Content>
    </Card>
    </>
  )

}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    // width:350,
    // height:180
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  nombre: {
    fontWeight: "bold",
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