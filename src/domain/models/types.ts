// Domain Models for GAD Parroquial Membrillal

export type ID = string;

export interface Parroquia {
  id: ID;
  titulo: string;
  contenidoHtml: string;
  imagenUrl?: string;
  updatedAt: string;
}

export interface Autoridad {
  id: ID;
  nombre: string;
  cargo: string;
  fotoUrl?: string;
  periodo: string;
  descripcion?: string;
}

export interface Comision {
  id: ID;
  nombre: string;
  integrantes: string[];
  objetivo?: string;
}

export type DocCategoria = 'Rendicion' | 'Presupuesto' | 'Licitacion' | 'MarcoLegal';

export interface Documento {
  id: ID;
  titulo: string;
  categoria: DocCategoria;
  anio: number;
  url: string;
  resumen?: string;
  etiquetas?: string[];
  publishedAt: string;
}

export interface Noticia {
  id: ID;
  titulo: string;
  categoria: string;
  cuerpoHtml: string;
  portadaUrl?: string;
  vistas: number;
  etiquetas?: string[];
  publishedAt: string;
}

export type EstadoEvento = 'programado' | 'realizado' | 'cancelado';

export interface Evento {
  id: ID;
  titulo: string;
  fecha: string;
  hora?: string;
  lugar?: string;
  descripcionHtml?: string;
  estado: EstadoEvento;
  portadaUrl?: string;
  etiquetas?: string[];
  createdAt: string;
}

export type TipoTramite = 'Certificacion' | 'Permiso';

export interface TramiteDef {
  id: ID;
  nombre: string;
  tipo: TipoTramite;
  costo: number;
  tiempoDias: string;
  requisitosHtml: string;
  activo: boolean;
}

export type EstadoSolicitud = 'borrador' | 'enviado' | 'observado' | 'aprobado' | 'rechazado' | 'pagado' | 'entregado';

export interface Ciudadano {
  nombres: string;
  documento: string;
  email: string;
  telefono?: string;
}

export interface Adj {
  id: ID;
  nombre: string;
  url: string;
}

export interface Log {
  fecha: string;
  estado: string;
  nota?: string;
  usuario?: string;
}

export interface TramiteInstancia {
  id: ID;
  tramiteId: ID;
  ciudadano: Ciudadano;
  estado: EstadoSolicitud;
  folio: string;
  historial: Log[];
  adjuntos?: Adj[];
  solicitud?: string;
  createdAt: string;
  updatedAt: string;
}

export type Rol = 'Administrador' | 'Editor' | 'Operador' | 'Consulta';

export interface Usuario {
  id: ID;
  nombre: string;
  email: string;
  passwordHash?: string;
  rol: Rol;
  activo: boolean;
}

export interface Comunicacion {
  id: ID;
  tipo: 'notificacion' | 'tarea';
  titulo: string;
  mensaje: string;
  leida: boolean;
  createdAt: string;
  related?: {
    tipo: 'tramite' | 'evento' | 'noticia';
    id: ID;
  };
}

export interface KPIsBase {
  presupuesto: number;
  ejecutado: number;
  transparencia: {
    recibidas: number;
    respondidas: number;
    pendientes: number;
  };
}

