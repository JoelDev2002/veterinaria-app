import { RegisterCredenciales, Usuario } from "../models/Usuario";

export const registerUsuario = (credenciales: RegisterCredenciales): Usuario =>{
  if(credenciales.password !== credenciales.confirmarPassword){
    throw new Error("las contraseñas no coinciden")
  }

  const nuevoUsuario: Usuario = {
    id: Date.now().toString(),
    nombre: credenciales.nombre,
    email: credenciales.email,
  };

  return nuevoUsuario;
}