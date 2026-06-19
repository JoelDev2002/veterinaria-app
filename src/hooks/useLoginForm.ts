import { useState } from "react";
import { LoginCredenciales } from "../models/Usuario";
import { validarEmail, validarPassword } from "../utils/validators";
import { loginUsuario } from "../usecases/LoginUsuario";

interface LoginFormErrors{
  email: string | null;
  password:string | null;
}

export const useLoginForm = (onSuccess: ()=> void)=>{

  const [credenciales,setCredenciales] = useState<LoginCredenciales>({
    email:"",
    password:"",
  })

  const [errores, setErrores] = useState<LoginFormErrors>({
    email:null,
    password:null,
  })

  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange =(campo:keyof LoginCredenciales, valor:string)=>{
    setCredenciales((prev)=>({...prev,[campo]:valor}));
    setErrores(prev => ({ ...prev, [campo]: null }));
    setErrorGeneral(null);
  }

  const validarFormulario = (): boolean => {
    const nuevosErrores: LoginFormErrors = {
      email: validarEmail(credenciales.email),
      password: validarPassword(credenciales.password),
    };
    setErrores(nuevosErrores);
    return !nuevosErrores.email && !nuevosErrores.password;
  };

  const handleSubmit = () => {
    if (!validarFormulario()) return;

    setIsLoading(true);
    try {
      loginUsuario(credenciales);
      onSuccess();
    } catch (error: any) {
      setErrorGeneral(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    credenciales,
    errores,
    errorGeneral,
    isLoading,
    handleChange,
    handleSubmit,
  };
}