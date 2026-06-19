import { LoginCredenciales, Usuario } from "../models/Usuario";
import { PASSWORD_SIMULADA, USUARIO_SIMULADO } from "../utils/constants";



export const loginUsuario = (credenciales: LoginCredenciales): Usuario => {
  if(
    credenciales.email === USUARIO_SIMULADO.email &&
    credenciales.password === PASSWORD_SIMULADA
  ){
    return USUARIO_SIMULADO;
  }

  throw new Error("Correo o contraseña incorrectos")
}