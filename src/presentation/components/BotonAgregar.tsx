import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

export default function BotonAgregar({onPress}:{readonly onPress: () => void}) {
  return (
    <IconButton
          icon="plus"
          iconColor="#a8dadc"
          size={25}
          style={styles.agregar}
          onPress={onPress}
          />
  )
}

const styles = StyleSheet.create({
  agregar:{
    backgroundColor:"#1A1A1A",
  },
})
