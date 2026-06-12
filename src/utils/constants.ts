import { Estado, Prioridad, TipoServicio } from "../models/Solicitud";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const ESTADOS = Object.values(Estado);
// → ['PENDIENTE', 'EN_ATENCION', 'FINALIZADO']

export const FILTROS_ESTADO =[
  "TODOS",
  ...ESTADOS
]

export const PRIORIDADES = Object.values(Prioridad);
// → ['BAJA', 'MEDIA', 'ALTA']

export const TIPOS_SERVICIO = Object.values(TipoServicio);
// → ['Consulta', 'Vacunación', 'Emergencia', 'Grooming']


export const COLOR_ESTADO: Record<Estado, string> = {
  [Estado.PENDIENTE]: '#F59E0B',
  [Estado.EN_ATENCION]: '#3B82F6',
  [Estado.FINALIZADO]: '#10B981',
};

// Colores por prioridad
export const COLOR_PRIORIDAD: Record<Prioridad, string> = {
  [Prioridad.BAJA]: '#6B7280',
  [Prioridad.MEDIA]: '#F59E0B',
  [Prioridad.ALTA]: '#EF4444',   
};


type IconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];
// Iconos por tipo de servicio (usarás esto con una librería de íconos)
export const ICONO_SERVICIO: Record<TipoServicio, IconName> = {
  [TipoServicio.CONSULTA]: 'medical-bag',
  [TipoServicio.VACUNACION]: 'needle',
  [TipoServicio.EMERGENCIA]: 'alert',
  [TipoServicio.GROOMING]: 'content-cut',
};