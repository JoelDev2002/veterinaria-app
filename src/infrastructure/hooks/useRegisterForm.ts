import { useState } from "react";
import { RegisterCredenciales } from "../../domain/models/Usuario";
import { validarConfirmarPassword, validarEmail, validarNombre, validarPassword } from "../utils/validators";
import { registerUsuario } from "../usecases/RegisterUsuario";

interface RegisterFormErrors {
  nombre: string | null;
  email: string | null;
  password: string | null;
  confirmarPassword: string | null;
}

export const useRegisterForm=(onSuccess: () => void)=>{

  const [credenciales,setCredenciales] = useState<RegisterCredenciales>({
    nombre:"",
    email:"",
    password:"",
    confirmarPassword:""
  })

  const [errores, setErrores] = useState<RegisterFormErrors>({
    nombre: null,
    email: null,
    password: null,
    confirmarPassword: null,
  });

  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (campo: keyof RegisterCredenciales, valor: string) => {
    setCredenciales(prev => ({ ...prev, [campo]: valor }));
    setErrores(prev => ({ ...prev, [campo]: null }));
    setErrorGeneral(null);
  };

  const validarFormulario = (): boolean => {
    const nuevosErrores: RegisterFormErrors = {
      nombre: validarNombre(credenciales.nombre),
      email: validarEmail(credenciales.email),
      password: validarPassword(credenciales.password),
      confirmarPassword: validarConfirmarPassword(
        credenciales.password,
        credenciales.confirmarPassword
      ),
    };
    setErrores(nuevosErrores);
    return !Object.values(nuevosErrores).some(e => e !== null);
  };

  const handleSubmit = () => {
    if (!validarFormulario()) return;

    setIsLoading(true);
    try {
      registerUsuario(credenciales);
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