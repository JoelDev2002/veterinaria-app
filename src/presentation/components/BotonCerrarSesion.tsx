import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function BotonCerrarSesion({onPress}:{readonly onPress: () => void}){
  return(
    <TouchableOpacity onPress={onPress} style={styles.boton}>
      <Ionicons name="log-out-outline" size={30} color={"#000000"}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  boton:{
    marginLeft:12,
    padding: 4,
  }
}) 