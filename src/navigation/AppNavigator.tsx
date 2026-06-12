import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CreateScreen from "../screens/CreateScreen";
import DetailScreen from "../screens/DetailScreen";
import HomeScreen from "../screens/HomeScreen";
import { Image, StyleSheet } from "react-native";
import EditScreen from "../screens/EditScreen";

export type Pantallas = {
  Home: undefined;
  Create: undefined;
  Detail: { solicitudId: string };
  Edit: { solicitudId: string };
};

const Stack = createNativeStackNavigator<Pantallas>();

export default function AppNavigator(){
  return(
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{

        headerStyle:{backgroundColor:"#a8dadc"},
        headerTitleAlign: "center",
        headerTintColor:"#fff",
        headerLeft:({canGoBack})=>(
          canGoBack
          ?null
          :<Image
          source={require("../../assets/logo-vet.png")}
          style={styles.logo}
          resizeMode="contain"
          />
        ),
        
      }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{title:'Solicitudes'}}/>
        <Stack.Screen name="Create" component={CreateScreen} options={{title:'Nueva Solicitud'}}/>
        <Stack.Screen name="Detail" component={DetailScreen} options={{title:'Detalle Solicitud'}}/>
        <Stack.Screen name="Edit" component={EditScreen} options={{title:'Editar Solicitud'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles=StyleSheet.create({
  logo:{
    width:50,
    height:50,
  },
  
})