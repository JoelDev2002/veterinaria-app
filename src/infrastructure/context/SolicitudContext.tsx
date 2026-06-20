import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
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


const solicitudesIniciales: Solicitud[] = [
  {
    id: uuid.v4() as string,
    clienteNombre: 'María García',
    telefono: '987654321',
    mascotaNombre: 'Luna',
    tipoServicio: TipoServicio.CONSULTA,
    prioridad: Prioridad.MEDIA,
    descripcion: 'La perrita lleva 2 días sin comer y está decaída.',
    estado: Estado.PENDIENTE,
    fechaRegistro: new Date().toLocaleString("es-PE",{
      timeZone:"America/Lima"
    }),
  },
  {
    id: uuid.v4() as string,
    clienteNombre: 'Carlos López',
    telefono: '912345678',
    mascotaNombre: 'Rocky',
    tipoServicio: TipoServicio.VACUNACION,
    prioridad: Prioridad.BAJA,
    descripcion: 'Vacuna anual antirrábica pendiente.',
    estado: Estado.EN_ATENCION,
    fechaRegistro: new Date().toLocaleString("es-PE",{
      timeZone:"America/Lima"
    }),
  },
  {
    id: uuid.v4() as string,
    clienteNombre: 'Ana Torres',
    telefono: '956789012',
    mascotaNombre: 'Michi',
    tipoServicio: TipoServicio.EMERGENCIA,
    prioridad: Prioridad.ALTA,
    descripcion: 'Gato se tragó un objeto, presenta vómitos.',
    estado: Estado.FINALIZADO,
    fechaRegistro: new Date().toLocaleString("es-PE",{
      timeZone:"America/Lima"
    }),
  },
  {
    id: uuid.v4() as string,
    clienteNombre: 'Luis Fernández',
    telefono: '923456789',
    mascotaNombre: 'Max',
    tipoServicio: TipoServicio.GROOMING,
    prioridad: Prioridad.ALTA,
    descripcion: 'Fractura en pata trasera derecha por caída.',
    estado: Estado.PENDIENTE,
    fechaRegistro: new Date().toLocaleString("es-PE", { timeZone: "America/Lima" }),
  },
  {
    id: uuid.v4() as string,
    clienteNombre: 'Roxana Méndez',
    telefono: '934567890',
    mascotaNombre: 'Nala',
    tipoServicio: TipoServicio.CONSULTA,
    prioridad: Prioridad.MEDIA,
    descripcion: 'Picazón excesiva y pérdida de pelo en zonas localizadas.',
    estado: Estado.EN_ATENCION,
    fechaRegistro: new Date().toLocaleString("es-PE", { timeZone: "America/Lima" }),
  },
  {
    id: uuid.v4() as string,
    clienteNombre: 'Jorge Ramírez',
    telefono: '945678901',
    mascotaNombre: 'Toby',
    tipoServicio: TipoServicio.VACUNACION,
    prioridad: Prioridad.BAJA,
    descripcion: 'Refuerzo de vacuna triple felina.',
    estado: Estado.FINALIZADO,
    fechaRegistro: new Date().toLocaleString("es-PE", { timeZone: "America/Lima" }),
  },
  {
    id: uuid.v4() as string,
    clienteNombre: 'Patricia Cáceres',
    telefono: '956789012',
    mascotaNombre: 'Kiara',
    tipoServicio: TipoServicio.EMERGENCIA,
    prioridad: Prioridad.ALTA,
    descripcion: 'Dificultad para respirar y encías pálidas.',
    estado: Estado.PENDIENTE,
    fechaRegistro: new Date().toLocaleString("es-PE", { timeZone: "America/Lima" }),
  },
  {
    id: uuid.v4() as string,
    clienteNombre: 'Andrés Huamán',
    telefono: '967890123',
    mascotaNombre: 'Simba',
    tipoServicio: TipoServicio.CONSULTA,
    prioridad: Prioridad.MEDIA,
    descripcion: 'Cojea intermitentemente desde hace una semana.',
    estado: Estado.EN_ATENCION,
    fechaRegistro: new Date().toLocaleString("es-PE", { timeZone: "America/Lima" }),
  },
  {
    id: uuid.v4() as string,
    clienteNombre: 'Veronica Ríos',
    telefono: '978901234',
    mascotaNombre: 'Bella',
    tipoServicio: TipoServicio.VACUNACION,
    prioridad: Prioridad.ALTA,
    descripcion: 'Quiste en glándula mamaria que ha crecido rápidamente.',
    estado: Estado.PENDIENTE,
    fechaRegistro: new Date().toLocaleString("es-PE", { timeZone: "America/Lima" }),
  },
  {
    id: uuid.v4() as string,
    clienteNombre: 'Daniela Paredes',
    telefono: '989012345',
    mascotaNombre: 'Coco',
    tipoServicio: TipoServicio.VACUNACION,
    prioridad: Prioridad.BAJA,
    descripcion: 'Primera vacuna contra la leucemia felina.',
    estado: Estado.FINALIZADO,
    fechaRegistro: new Date().toLocaleString("es-PE", { timeZone: "America/Lima" }),
  },
  {
    id: uuid.v4() as string,
    clienteNombre: 'Ricardo Soto',
    telefono: '990123456',
    mascotaNombre: 'Thor',
    tipoServicio: TipoServicio.EMERGENCIA,
    prioridad: Prioridad.ALTA,
    descripcion: 'Convulsiones repetitivas, pérdida de conciencia.',
    estado: Estado.PENDIENTE,
    fechaRegistro: new Date().toLocaleString("es-PE", { timeZone: "America/Lima" }),
  },
  {
    id: uuid.v4() as string,
    clienteNombre: 'Gabriela Quiroz',
    telefono: '901234567',
    mascotaNombre: 'Lola',
    tipoServicio: TipoServicio.CONSULTA,
    prioridad: Prioridad.MEDIA,
    descripcion: 'Vómitos esporádicos y falta de apetito por 3 días.',
    estado: Estado.EN_ATENCION,
    fechaRegistro: new Date().toLocaleString("es-PE", { timeZone: "America/Lima" }),
  },
];

export const SolicitudProvider = ({ children }: { children: ReactNode }) => {

  const [solicitudes, dispatch] = useReducer(solicitudReducer, []);


  useEffect(() => {
    solicitudesIniciales.forEach(s =>
      dispatch({ type: 'AGREGAR', payload: s })
    );
  }, []);

  const agregar = (solicitud: Solicitud) =>
    dispatch({ type: 'AGREGAR', payload: solicitud });

  const editar = (solicitud: Solicitud) =>
    dispatch({ type: 'EDITAR', payload: solicitud });

  const eliminar = (id: string) =>
    dispatch({ type: 'ELIMINAR', payload: id });

  const cambiarEstado = (id: string, estado: Estado) =>
    dispatch({ type: 'CAMBIAR_ESTADO', payload: { id, estado } });

  return (

    <SolicitudContext.Provider
      value={{ solicitudes, agregar, editar, eliminar, cambiarEstado }}
    >
      {children}
    </SolicitudContext.Provider>
  );
};

// 5. HOOK PERSONALIZADO — para no repetir useContext en cada pantalla
//    En lugar de: const ctx = useContext(SolicitudContext)
//    Escribes:     const { solicitudes, agregar } = useSolicitudes()
export const useSolicitudes = () => useContext(SolicitudContext);