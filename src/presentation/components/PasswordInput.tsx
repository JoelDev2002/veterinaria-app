import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

type PasswordInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export function PasswordInput ({value,onChangeText,placeholder="********"}:  Readonly<PasswordInputProps>){
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword=()=>{
    setShowPassword(prev => !prev)
  }
  return(
    <View style={styles.passwordContainer}>
      <TextInput
        style={styles.inputPassword}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={showPassword}
      />
      <TouchableOpacity onPress={handleShowPassword}>
        <Ionicons hay name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#888" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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

});

