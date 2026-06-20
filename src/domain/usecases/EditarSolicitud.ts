import { Solicitud } from "../models/Solicitud";

export const  editarSolicitud=(solicitudOriginal: Solicitud, cambios: Partial<Solicitud>): Solicitud=>{
  return {
    ...solicitudOriginal,
    ...cambios
  }
}