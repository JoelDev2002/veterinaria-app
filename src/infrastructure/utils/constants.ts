import { Estado, Prioridad, TipoServicio } from "../../domain/models/Solicitud";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Usuario } from "../../domain/models/Usuario";

export const ESTADOS = Object.values(Estado);


export const FILTROS_ESTADO =[
  "TODOS",
  ...ESTADOS
]

export const ESTADOS_LABELS : Record<string,string> = {
  'TODOS':'TODOS',
  [Estado.PENDIENTE]:'PENDIENTE',
  [Estado.EN_ATENCION]:'EN ATENCIÓN',
  [Estado.FINALIZADO]:'FINALIZADO',
}

export const PRIORIDADES = Object.values(Prioridad);


export const PRIORIDADES_LABELS : Record<Prioridad,string> = {
  [Prioridad.BAJA]:'BAJA',
  [Prioridad.MEDIA]:'MEDIA',
  [Prioridad.ALTA]:'ALTA',
}

export const TIPOS_SERVICIO = Object.values(TipoServicio);

export const TIPOS_SERVICIO_LABELS: Record<string,string> = {
  [TipoServicio.CONSULTA]:'Consulta',
  [TipoServicio.VACUNACION]:'Vacunación',
  [TipoServicio.EMERGENCIA]:'Emergencia',
  [TipoServicio.GROOMING]:'Grooming',
}

export const COLOR_ESTADO: Record<Estado, string> = {
  [Estado.PENDIENTE]: '#C97A1A',
  [Estado.EN_ATENCION]: '#2C6FB5',
  [Estado.FINALIZADO]: '#0F6E56',
};


export const COLOR_PRIORIDAD: Record<Prioridad, string> = {
  [Prioridad.BAJA]: '#6B7280',
  [Prioridad.MEDIA]: '#F59E0B',
  [Prioridad.ALTA]: '#EF4444',   
};


type IconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

export const ICONO_SERVICIO: Record<TipoServicio, IconName> = {
  [TipoServicio.CONSULTA]: 'medical-bag',
  [TipoServicio.VACUNACION]: 'needle',
  [TipoServicio.EMERGENCIA]: 'alert',
  [TipoServicio.GROOMING]: 'content-cut',
};





export const USUARIO_SIMULADO: Usuario = {
  id: '1',
  nombre: 'Usuario Demo',
  email: 'admin@gmail.com',
};

export const PASSWORD_SIMULADA = '123456';