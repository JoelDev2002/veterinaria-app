import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pantallas } from "../navigation/AppNavigator";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { ActivityIndicator, Image, ImageBackground, KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type LoginScreenProps = NativeStackScreenProps<Pantallas, "Register">;

export const RegisterScreen = ({ navigation }: LoginScreenProps) => {
  const { credenciales, errores, errorGeneral, isLoading, handleChange, handleSubmit } =
    useRegisterForm(() => navigation.navigate('Home'));

  return (
    <KeyboardAvoidingView
    style={{flex:1}}
    behavior="height"
    >
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Header */}
      <ImageBackground source={require("../../assets/portada-register.jpg")} style={styles.header} resizeMode="contain">
        <View style={styles.iconoCirculo}>
          <Image source={require("../../assets/logo-vet.png")} style={styles.iconoImage}/>
        </View>
        <Text style={styles.titulo}>Crear cuenta</Text>
        <Text style={styles.subtitulo}>Únete a nuestra clínica veterinaria</Text>
      </ImageBackground>

      {/* Formulario */}
      <View style={styles.formulario}>

        <Text style={styles.label}>NOMBRE</Text>
        <TextInput
          style={styles.input}
          placeholder="Tu nombre completo"
          placeholderTextColor="#aaa"
          value={credenciales.nombre}
          onChangeText={(valor) => handleChange('nombre', valor)}
          autoCapitalize="words"
        />
        {errores.nombre && <Text style={styles.errorCampo}>{errores.nombre}</Text>}

        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="ejemplo@veterinaria.com"
          placeholderTextColor="#aaa"
          value={credenciales.email}
          onChangeText={(valor) => handleChange('email', valor)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errores.email && <Text style={styles.errorCampo}>{errores.email}</Text>}

        <Text style={styles.label}>CONTRASEÑA</Text>
        <TextInput
          style={styles.input}
          placeholder="Mínimo 6 caracteres"
          placeholderTextColor="#aaa"
          value={credenciales.password}
          onChangeText={(valor) => handleChange('password', valor)}
          secureTextEntry
        />
        {errores.password && <Text style={styles.errorCampo}>{errores.password}</Text>}

        <Text style={styles.label}>CONFIRMAR CONTRASEÑA</Text>
        <TextInput
          style={styles.input}
          placeholder="Repite tu contraseña"
          placeholderTextColor="#aaa"
          value={credenciales.confirmarPassword}
          onChangeText={(valor) => handleChange('confirmarPassword', valor)}
          secureTextEntry
        />
        {errores.confirmarPassword && (
          <Text style={styles.errorCampo}>{errores.confirmarPassword}</Text>
        )}

        {errorGeneral && <Text style={styles.errorGeneral}>{errorGeneral}</Text>}

        <TouchableOpacity
          style={[styles.boton, isLoading && styles.botonDeshabilitado]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.botonTexto}>CREAR CUENTA</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>
            ¿Ya tienes cuenta? <Text style={styles.linkNegrita}>INICIA SESIÓN</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const VERDE = '#3dbfaa';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 32,
  },
  iconoCirculo: {
    width:90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  iconoImage: {
    width:85,
    height:85,
    resizeMode:"contain"

  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 13,
    color: '#888',
  },
  formulario: {
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 40,
  },
  label: {
    fontSize: 11,
    color: '#888',
    letterSpacing: 1,
    marginBottom: 4,
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    fontSize: 15,
    paddingVertical: 6,
    color: '#222',
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
    marginTop: 12,
  },
  boton: {
    backgroundColor: "#2A9D8F",
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 36,
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