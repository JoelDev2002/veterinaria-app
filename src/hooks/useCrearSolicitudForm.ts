import { useState } from "react";
import { Prioridad, TipoServicio } from "../models/Solicitud";
import { validarDescripcion, validarMascota, validarNombre, validarSeleccion, validarTelefono } from "../utils/validators";
import { crearSolicitud } from "../usecases/CrearSolicitud";
import { useSolicitudes } from "../context/SolicitudContext";

interface CrearSolicitudForm {
  clienteNombre: string;
  telefono: string;
  mascotaNombre: string;
  tipoServicio: TipoServicio | "";
  prioridad: Prioridad | "";
  descripcion: string;
}

interface CrearSolicitudErrors {
  clienteNombre: string | null;
  telefono: string | null;
  mascotaNombre: string | null;
  tipoServicio: string | null;
  prioridad: string | null;
  descripcion: string | null;
}

export const useCrearSolicitudForm = (onSuccess:() => void ) => {

  const { agregar } = useSolicitudes()

  const [form, setForm]= useState<CrearSolicitudForm>({
      clienteNombre:"",
      telefono:"",
      mascotaNombre:"",
      tipoServicio:"" as TipoServicio| "",
      prioridad:"" as Prioridad |"",
      descripcion:""
    })
  
  const [errores, setErrores] =useState<CrearSolicitudErrors>({
    clienteNombre: null, 
    telefono : null,
    mascotaNombre: null, 
    tipoServicio: null,
    prioridad: null,
    descripcion: null,
  })

  const handleChange = (campo: keyof CrearSolicitudForm, valor:string)=>{
    setForm((prev) => ({...prev, [campo]:valor}))
    setErrores((prev) => ({...prev, [campo]: null}))
  }

  const validarForm = (): boolean=>{
    const nuevosErrores: CrearSolicitudErrors={
      clienteNombre: validarNombre(form.clienteNombre),
      telefono: validarTelefono(form.telefono),
      mascotaNombre: validarMascota(form.mascotaNombre),
      tipoServicio: validarSeleccion(form.tipoServicio, 'tipo de servicio'),
      prioridad: validarSeleccion(form.prioridad, 'prioridad'),
      descripcion: validarDescripcion(form.descripcion),
    };
    setErrores(nuevosErrores)
    return !Object.values(nuevosErrores).some(error => error !== null)
  }

  const handleGuardar=() => {
    if(!validarForm()) return;

    const nuevaSolicitud = crearSolicitud({
          clienteNombre: form.clienteNombre,
          mascotaNombre: form.mascotaNombre,
          telefono: form.telefono,
          tipoServicio: form.tipoServicio as TipoServicio,
          prioridad: form.prioridad as Prioridad,
          descripcion: form.descripcion,
    })
    agregar(nuevaSolicitud)
    onSuccess()
  };

  return{
    form,
    errores,
    handleChange,
    handleGuardar,
  }
}