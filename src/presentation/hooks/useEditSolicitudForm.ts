import { useState } from "react";
import { Estado, Prioridad, Solicitud } from "../../domain/models/Solicitud";
import { validarDescripcion } from "../../infrastructure/utils/validators";
import { Alert } from "react-native";
import { editarSolicitud } from "../../domain/usecases/EditarSolicitud";
import { useSolicitudes } from "../context/SolicitudContext";
import { puedeEliminarSolicitud } from "../../domain/usecases/EliminarSolicitud";

interface EditarForm{
  estado: Estado,
  prioridad: Prioridad,
  descripcion: string,
}

export const useEditSolicitudForm=(solicitud:Solicitud | undefined,onSuccess: ()=> void)=>{

  const {editar, eliminar} = useSolicitudes()

  const [form, setForm] = useState<EditarForm>({
    estado: solicitud?.estado ?? Estado.PENDIENTE,
    prioridad: solicitud?.prioridad ?? Prioridad.BAJA,
    descripcion: solicitud?.descripcion ?? "",
  })

  const handleChange=(campo: keyof EditarForm, valor: string)=>{
    setForm((prev) =>({...prev,[campo]: valor}))
  }

  const handleGuardar = () => {
      if (!solicitud) return;
      const errorDescripcion = validarDescripcion(form.descripcion);
      if (errorDescripcion) {
        Alert.alert("Error", errorDescripcion);
      }
  
      Alert.alert("Guardar cambios", "¿Deseas guardar los cambios?", [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Guardar",
          onPress: () => {
            const solicitudEditada = editarSolicitud(solicitud, form);
            editar(solicitudEditada);
            onSuccess();
          },
        },
      ]);
    };

    const handleEliminar = () => {
      if (!solicitud) return;
      if (!puedeEliminarSolicitud(solicitud)) {
      Alert.alert(
        "No permitido",
        "No puedes eliminar una solicitud con estado 'en atención'",
      );
      return;
    }
    Alert.alert(
      "Eliminar Solicitud",
      "¿Deseas eliminar la solicitud permanentemente?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            eliminar(solicitud.id);
            onSuccess();
          },
        },
      ],
    );
  };

    return{
      handleChange,
      handleGuardar,
      handleEliminar,
      form
    }
}