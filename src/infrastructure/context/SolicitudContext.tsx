import { createContext, ReactNode, useContext, useMemo, useReducer } from "react";
import { Estado, Prioridad, Solicitud, TipoServicio } from "../../domain/models/Solicitud";
import { solicitudReducer } from "./solicitudReducer";
import uuid from "react-native-uuid"

interface SolicitudContextType {
  solicitudes: Solicitud[];
  agregar: (solicitud: Solicitud) => void;
  editar: (solicitud: Solicitud) => void;
  eliminar: (id: string) => void;
  cambiarEstado: (id: string, estado: Estado) => void;
}

const SolicitudContext =createContext<SolicitudContextType>({} as SolicitudContextType)

const fechaActual = () =>{
  return new Date().toLocaleString("es-PE", {
    timeZone: "America/Lima",
  });
}
  

const solicitudesIniciales: Solicitud[] = [
  {
    id: uuid.v4(),
    clienteNombre: 'María García',
    telefono: '987654321',
    mascotaNombre: 'Luna',
    tipoServicio: TipoServicio.CONSULTA,
    prioridad: Prioridad.MEDIA,
    descripcion: 'La perrita lleva 2 días sin comer y está decaída.',
    estado: Estado.PENDIENTE,
    fechaRegistro: fechaActual(),
  },
  {
    id: uuid.v4(),
    clienteNombre: 'Carlos López',
    telefono: '912345678',
    mascotaNombre: 'Rocky',
    tipoServicio: TipoServicio.VACUNACION,
    prioridad: Prioridad.BAJA,
    descripcion: 'Vacuna anual antirrábica pendiente.',
    estado: Estado.EN_ATENCION,
    fechaRegistro: fechaActual(),
  },
  {
    id: uuid.v4(),
    clienteNombre: 'Ana Torres',
    telefono: '956789012',
    mascotaNombre: 'Michi',
    tipoServicio: TipoServicio.EMERGENCIA,
    prioridad: Prioridad.ALTA,
    descripcion: 'Gato se tragó un objeto, presenta vómitos.',
    estado: Estado.FINALIZADO,
    fechaRegistro: fechaActual(),
  },
  {
    id: uuid.v4(),
    clienteNombre: 'Luis Fernández',
    telefono: '923456789',
    mascotaNombre: 'Max',
    tipoServicio: TipoServicio.GROOMING,
    prioridad: Prioridad.ALTA,
    descripcion: 'Fractura en pata trasera derecha por caída.',
    estado: Estado.PENDIENTE,
    fechaRegistro: fechaActual(),
  },
  {
    id: uuid.v4(),
    clienteNombre: 'Roxana Méndez',
    telefono: '934567890',
    mascotaNombre: 'Nala',
    tipoServicio: TipoServicio.CONSULTA,
    prioridad: Prioridad.MEDIA,
    descripcion: 'Picazón excesiva y pérdida de pelo en zonas localizadas.',
    estado: Estado.EN_ATENCION,
    fechaRegistro: fechaActual(),
  },
  {
    id: uuid.v4(),
    clienteNombre: 'Jorge Ramírez',
    telefono: '945678901',
    mascotaNombre: 'Toby',
    tipoServicio: TipoServicio.VACUNACION,
    prioridad: Prioridad.BAJA,
    descripcion: 'Refuerzo de vacuna triple felina.',
    estado: Estado.FINALIZADO,
    fechaRegistro: fechaActual(),
  },
  {
    id: uuid.v4(),
    clienteNombre: 'Patricia Cáceres',
    telefono: '956789012',
    mascotaNombre: 'Kiara',
    tipoServicio: TipoServicio.EMERGENCIA,
    prioridad: Prioridad.ALTA,
    descripcion: 'Dificultad para respirar y encías pálidas.',
    estado: Estado.PENDIENTE,
    fechaRegistro: fechaActual(),
  },
  {
    id: uuid.v4(),
    clienteNombre: 'Andrés Huamán',
    telefono: '967890123',
    mascotaNombre: 'Simba',
    tipoServicio: TipoServicio.CONSULTA,
    prioridad: Prioridad.MEDIA,
    descripcion: 'Cojea intermitentemente desde hace una semana.',
    estado: Estado.EN_ATENCION,
    fechaRegistro: fechaActual(),
  },
  {
    id: uuid.v4(),
    clienteNombre: 'Veronica Ríos',
    telefono: '978901234',
    mascotaNombre: 'Bella',
    tipoServicio: TipoServicio.VACUNACION,
    prioridad: Prioridad.ALTA,
    descripcion: 'Quiste en glándula mamaria que ha crecido rápidamente.',
    estado: Estado.PENDIENTE,
    fechaRegistro: fechaActual(),
  },
  {
    id: uuid.v4(),
    clienteNombre: 'Daniela Paredes',
    telefono: '989012345',
    mascotaNombre: 'Coco',
    tipoServicio: TipoServicio.VACUNACION,
    prioridad: Prioridad.BAJA,
    descripcion: 'Primera vacuna contra la leucemia felina.',
    estado: Estado.FINALIZADO,
    fechaRegistro: fechaActual(),
  },
  {
    id: uuid.v4(),
    clienteNombre: 'Ricardo Soto',
    telefono: '990123456',
    mascotaNombre: 'Thor',
    tipoServicio: TipoServicio.EMERGENCIA,
    prioridad: Prioridad.ALTA,
    descripcion: 'Convulsiones repetitivas, pérdida de conciencia.',
    estado: Estado.PENDIENTE,
    fechaRegistro: fechaActual(),
  },
  {
    id: uuid.v4(),
    clienteNombre: 'Gabriela Quiroz',
    telefono: '901234567',
    mascotaNombre: 'Lola',
    tipoServicio: TipoServicio.CONSULTA,
    prioridad: Prioridad.MEDIA,
    descripcion: 'Vómitos esporádicos y falta de apetito por 3 días.',
    estado: Estado.EN_ATENCION,
    fechaRegistro: fechaActual(),
  },
];

export const SolicitudProvider = ({ children }: { children: ReactNode }) => {

  const [solicitudes, dispatch] = useReducer(solicitudReducer, solicitudesIniciales);


  const agregar = (solicitud: Solicitud) =>
    dispatch({ type: 'AGREGAR', payload: solicitud });

  const editar = (solicitud: Solicitud) =>
    dispatch({ type: 'EDITAR', payload: solicitud });

  const eliminar = (id: string) =>
    dispatch({ type: 'ELIMINAR', payload: id });

  const cambiarEstado = (id: string, estado: Estado) =>
    dispatch({ type: 'CAMBIAR_ESTADO', payload: { id, estado } });


  const value = useMemo(
    () =>({ solicitudes, agregar, editar, eliminar, cambiarEstado }),
    [solicitudes]
  );
  return (

    <SolicitudContext.Provider value={value}>
      {children}
    </SolicitudContext.Provider>
  );
};
export const useSolicitudes = () => useContext(SolicitudContext);