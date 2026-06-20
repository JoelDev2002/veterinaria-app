import { Searchbar } from "react-native-paper";
import { StyleSheet } from "react-native";


interface BuscadorProps{
  value:string,
  onChangeText:(texto: string) => void
}

export default function Buscador({value, onChangeText}: BuscadorProps) {
  return (
    <Searchbar
      placeholder="Buscar Solicitudes..."
      placeholderTextColor="#666"

      onChangeText={onChangeText}
      value={value}
      style={styles.buscador}
      inputStyle={{color:"#000"}}
    />
  );
}

const styles = StyleSheet.create({
  buscador:{
    backgroundColor:"#EAEAEA",
    height:60
  }
})