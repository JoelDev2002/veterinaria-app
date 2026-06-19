import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CreateScreen from "../screens/CreateScreen";
import DetailScreen from "../screens/DetailScreen";
import HomeScreen from "../screens/HomeScreen";
import { Image, StyleSheet } from "react-native";
import EditScreen from "../screens/EditScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";

export type Pantallas = {
  Home: undefined;
  Create: undefined;
  Detail: { solicitudId: string };
  Edit: { solicitudId: string };
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<Pantallas>();

export default function AppNavigator(){
  return(
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{

        headerStyle:{backgroundColor:"#a8dadc"},
        headerTitleAlign: "center",
        headerTintColor:"#fff",
      }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{title:'Solicitudes'}}/>
        <Stack.Screen name="Create" component={CreateScreen} options={{title:'Nueva Solicitud'}}/>
        <Stack.Screen name="Detail" component={DetailScreen} options={{title:'Detalle Solicitud'}}/>
        <Stack.Screen name="Edit" component={EditScreen} options={{title:'Editar Solicitud'}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}