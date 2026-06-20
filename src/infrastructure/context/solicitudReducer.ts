import { Estado, Solicitud } from "../../domain/models/Solicitud";

export type SolicitudAction =
  | { type: 'AGREGAR'; payload: Solicitud }
  | { type: 'EDITAR'; payload: Solicitud }
  | { type: 'ELIMINAR'; payload: string }
  | { type: 'CAMBIAR_ESTADO'; payload: { id: string; estado: Estado } };


export const solicitudReducer = (
  state: Solicitud[],
  action: SolicitudAction
): Solicitud[] => {
  switch (action.type) {

    case 'AGREGAR':
      return [action.payload, ...state];

    case 'EDITAR':

      return state.map(solicitud =>
        solicitud.id === action.payload.id ? action.payload : solicitud
      );

    case 'ELIMINAR':
      return state.filter(solicitud => solicitud.id !== action.payload);

    case 'CAMBIAR_ESTADO':
      return state.map(solicitud =>
        solicitud.id === action.payload.id
          ? { ...solicitud, estado: action.payload.estado }
          : solicitud
      );

    default:
      return state;
  }
};