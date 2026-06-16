import { Estado, Solicitud } from "../models/Solicitud";

export const puedeEliminarSolicitud=(solicitud: Solicitud):boolean =>{
  return solicitud.estado === Estado.PENDIENTE
}