import { Estado, Prioridad, TipoServicio } from "../models/Solicitud";
import uuid from 'react-native-uuid'

interface CrearSolicitudInput {
  clienteNombre: string;
  telefono: string;
  mascotaNombre: string;
  tipoServicio: TipoServicio;
  prioridad: Prioridad;
  descripcion: string;
}

export const crearSolicitud = (input: CrearSolicitudInput) => {

      return{
      id: uuid.v4() as string,
      fechaRegistro: new Date().toLocaleString("es-PE",{
      timeZone:"America/Lima"
    }),
      estado:Estado.PENDIENTE,
      ...input
    }
}