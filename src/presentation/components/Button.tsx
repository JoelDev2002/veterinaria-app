
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";

type ButtonProps={
  texto : string
  activo ?: boolean
  onPress : () => void
}

export default function Button({texto, activo=false, onPress}:ButtonProps){

  

  return (
    <PaperButton 
    mode="contained"
    buttonColor={activo?"#1A1A1A":"#EAEAEA"}
    textColor={activo?"#EAEAEA":"#1A1A1A"}
    style={styles.boton}
    onPress={onPress}
    >
      {texto}
    </PaperButton>
  )
}

const styles=StyleSheet.create({
  boton:{
    borderRadius:25,
    alignSelf: "flex-start",
  }
})