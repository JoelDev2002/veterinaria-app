export enum Estado{
  PENDIENTE = 'PENDIENTE',
  EN_ATENCION = 'EN_ATENCION',
  FINALIZADO = 'FINALIZADO'
}

export enum Prioridad{
  BAJA = 'BAJA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
}

export enum TipoServicio {
  CONSULTA = 'Consulta',
  VACUNACION = 'Vacunación',
  EMERGENCIA = 'Emergencia',
  GROOMING = 'Grooming',
}

export interface Solicitud {
  id: string;
  clienteNombre: string;
  telefono: string;
  mascotaNombre: string;
  tipoServicio: TipoServicio;
  prioridad: Prioridad;
  descripcion: string;
  estado: Estado;
  fechaRegistro: string; 
}