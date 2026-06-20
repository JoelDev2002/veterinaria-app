import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pantallas } from "../navigation/AppNavigator";
import { ActivityIndicator, Image, ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useLoginForm } from "../../infrastructure/hooks/useLoginForm";
import { SafeAreaView } from "react-native-safe-area-context";


type LoginScreenProps = NativeStackScreenProps<Pantallas, "Login">;
export function LoginScreen({navigation}: LoginScreenProps){

  const {credenciales,errorGeneral,errores,isLoading,handleChange,handleSubmit}= useLoginForm(()=> (navigation.navigate('Home')))

  return(
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />

      {/* Header placeholder */}
      <ImageBackground source={require("../../assets/portada.webp")} resizeMode="cover" style={styles.imagePortada}>
        <View style={styles.iconoCirculo}>
          <Image source={require("../../assets/logo-vet.png")} style={styles.iconoImagen}/>
        </View>
      </ImageBackground>

      {/* Formulario */}
      <View style={styles.formulario}>

        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="ejemplo@veterinaria.com"
          placeholderTextColor="#aaa"
          value={credenciales.email}
          onChangeText={(valor) => handleChange('email', valor)}
          keyboardType="email-address"
        />
        {errores.email && <Text style={styles.errorCampo}>{errores.email}</Text>}

        <Text style={styles.label}>CONTRASEÑA</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="••••••••"
            placeholderTextColor="#aaa"
            value={credenciales.password}
            onChangeText={(valor) => handleChange('password', valor)}
            secureTextEntry
          />
          <TouchableOpacity>
            <Text style={styles.olvidaste}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
        {errores.password && <Text style={styles.errorCampo}>{errores.password}</Text>}

        {errorGeneral && <Text style={styles.errorGeneral}>{errorGeneral}</Text>}

        <TouchableOpacity
          style={[styles.boton, isLoading && styles.botonDeshabilitado]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.botonTexto}>INICIAR SESIÓN</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>¿No tienes cuenta? <Text style={styles.linkNegrita}>REGÍSTRATE</Text></Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const VERDE = '#a8dadc';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VERDE,
  },
  imagePortada: {
    height: 400,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconoCirculo: {
    width: 85,
    height: 85,
    borderRadius: 45,
    borderColor:"#fff",
    borderWidth:5,
    backgroundColor: VERDE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -45,
    zIndex: 1,
  },
  iconoImagen: {
    width:60,
    height:60,
    resizeMode:"contain",
  },
  formulario: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 28,
    paddingTop: 52,
  },
  label: {
    fontSize: 11,
    color: '#888',
    letterSpacing: 1,
    marginBottom: 4,
    marginTop: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    fontSize: 15,
    paddingVertical: 6,
    color: '#222',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  inputPassword: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 6,
    color: '#222',
  },
  olvidaste: {
    fontSize: 12,
    color: "#2A9D8F",
  },
  errorCampo: {
    color: 'red',
    fontSize: 11,
    marginTop: 2,
  },
  errorGeneral: {
    color: 'red',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
  },
  boton: {
    backgroundColor: "#2A9D8F",
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 20,
  },
  botonDeshabilitado: {
    backgroundColor: '#aaa',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1.5,
    fontSize: 15,
  },
  link: {
    textAlign: 'center',
    color: '#888',
    fontSize: 13,
  },
  linkNegrita: {
    color: '#333',
    fontWeight: 'bold',
  },
});