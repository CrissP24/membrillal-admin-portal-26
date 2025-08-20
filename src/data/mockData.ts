// Mock data for GAD Parroquial Membrillal Dashboard
export const mockAuth = {
  users: [
    {
      id: 1,
      username: "admin",
      password: "admin123",
      email: "admin@membrillal.gob.ec",
      role: "admin",
      fullName: "Administrador Sistema",
      avatar: "/api/placeholder/40/40",
      lastLogin: "2024-01-15T10:30:00Z",
      status: "active"
    },
    {
      id: 2,
      username: "editor",
      password: "editor123",
      email: "editor@membrillal.gob.ec",
      role: "editor",
      fullName: "Juan Pérez - Editor",
      avatar: "/api/placeholder/40/40",
      lastLogin: "2024-01-15T09:15:00Z",
      status: "active"
    }
  ],
  roles: [
    {
      id: 1,
      name: "admin",
      label: "Administrador",
      permissions: ["*"]
    },
    {
      id: 2,
      name: "editor",
      label: "Editor",
      permissions: ["read", "write", "update"]
    },
    {
      id: 3,
      name: "revisor",
      label: "Revisor",
      permissions: ["read", "review"]
    },
    {
      id: 4,
      name: "usuario_publico",
      label: "Usuario Público",
      permissions: ["read"]
    }
  ]
};

export const dashboardData = {
  widgets: {
    usuariosActivos: 152,
    tramitesPendientes: 23,
    tramitesEnProceso: 45,
    tramitesAprobados: 98,
    tramitesRechazados: 7,
    noticiasPublicadasMes: 12,
    eventosProximos: 5,
    ejecucionPresupuestaria: {
      ejecutado: 1450000,
      presupuestado: 2000000,
      porcentaje: 72.5
    },
    solicitudesInformacion: {
      recibidas: 37,
      respondidas: 25,
      pendientes: 12
    }
  },
  recentActivity: [
    {
      id: 1,
      type: "tramite",
      description: "Nuevo trámite de permiso de construcción",
      user: "Juan Pérez",
      timestamp: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      type: "noticia",
      description: "Noticia publicada: Mejoras en infraestructura vial",
      user: "María García",
      timestamp: "2024-01-15T09:15:00Z"
    },
    {
      id: 3,
      type: "evento",
      description: "Evento programado: Sesión de consejo parroquial",
      user: "Admin Sistema",
      timestamp: "2024-01-15T08:45:00Z"
    }
  ]
};

export const sidebarData = [
  {
    title: "Inicio",
    icon: "home",
    path: "/dashboard"
  },
  {
    title: "Gestión Institucional",
    icon: "building",
    children: [
      { title: "Parroquia", path: "/institucional/parroquia" },
      { title: "Organización GAD", path: "/institucional/organizacion" },
      { title: "Comisiones", path: "/institucional/comisiones" },
      { title: "Marco Legal", path: "/institucional/marco-legal" }
    ]
  },
  {
    title: "Transparencia",
    icon: "scale",
    children: [
      { title: "Rendición de Cuentas", path: "/transparencia/rendicion" },
      { title: "Presupuesto", path: "/transparencia/presupuesto" },
      { title: "Licitaciones y Convenios", path: "/transparencia/licitaciones" },
      { title: "Solicitudes Información", path: "/transparencia/solicitudes" }
    ]
  },
  {
    title: "Servicios en Línea",
    icon: "clipboard-list",
    path: "/servicios/tramites"
  },
  {
    title: "Noticias y Comunicados",
    icon: "newspaper",
    children: [
      { title: "Noticias", path: "/noticias" },
      { title: "Comunicados", path: "/comunicados" }
    ]
  },
  {
    title: "Eventos y Agenda",
    icon: "calendar",
    path: "/eventos"
  },
  {
    title: "Turismo y Cultura",
    icon: "map-pin",
    path: "/turismo"
  },
  {
    title: "Gestión Documental",
    icon: "folder-open",
    path: "/documentos"
  },
  {
    title: "Reportes y Estadísticas",
    icon: "bar-chart-3",
    path: "/reportes"
  },
  {
    title: "Configuración",
    icon: "settings",
    path: "/configuracion"
  }
];

export const tramitesData = [
  {
    id: 1,
    numeroTramite: "TR-2024-001",
    tipo: "Permiso de Construcción",
    solicitante: "Carlos Mendoza",
    fechaSolicitud: "2024-01-10",
    estado: "pendiente",
    descripcion: "Solicitud de permiso para construcción de vivienda unifamiliar",
    documentos: ["cedula.pdf", "planos.pdf", "certificado_lotes.pdf"],
    observaciones: "",
    responsable: "Juan Pérez",
    timeline: [
      {
        fecha: "2024-01-10",
        accion: "Solicitud recibida",
        usuario: "Sistema",
        comentario: "Trámite ingresado al sistema"
      }
    ]
  },
  {
    id: 2,
    numeroTramite: "TR-2024-002",
    tipo: "Certificado de Residencia",
    solicitante: "María González",
    fechaSolicitud: "2024-01-12",
    estado: "en_proceso",
    descripcion: "Certificado de residencia para trámites universitarios",
    documentos: ["cedula.pdf", "certificado_votacion.pdf"],
    observaciones: "Revisando documentación",
    responsable: "Ana López",
    timeline: [
      {
        fecha: "2024-01-12",
        accion: "Solicitud recibida",
        usuario: "Sistema",
        comentario: "Trámite ingresado al sistema"
      },
      {
        fecha: "2024-01-13",
        accion: "En revisión",
        usuario: "Ana López",
        comentario: "Iniciando proceso de verificación"
      }
    ]
  }
];

export const noticiasData = [
  {
    id: 1,
    titulo: "Mejoras en infraestructura vial de Membrillal",
    contenido: "La parroquia Membrillal ha iniciado importantes obras de mejoramiento vial...",
    autor: "María García",
    fechaPublicacion: "2024-01-15",
    estado: "publicado",
    categoria: "infraestructura",
    imagen: "/api/placeholder/600/300",
    tags: ["infraestructura", "vial", "desarrollo"]
  },
  {
    id: 2,
    titulo: "Convocatoria a sesión de consejo parroquial",
    contenido: "Se convoca a la ciudadanía a participar en la próxima sesión del consejo...",
    autor: "Juan Pérez",
    fechaPublicacion: "2024-01-14",
    estado: "publicado",
    categoria: "convocatoria",
    imagen: "/api/placeholder/600/300",
    tags: ["consejo", "participacion", "ciudadania"]
  }
];

export const eventosData = [
  {
    id: 1,
    titulo: "Sesión Ordinaria del Consejo Parroquial",
    descripcion: "Sesión mensual del consejo parroquial de Membrillal",
    fechaInicio: "2024-01-20T09:00:00",
    fechaFin: "2024-01-20T12:00:00",
    lugar: "Casa Parroquial de Membrillal",
    tipo: "reunion",
    estado: "programado"
  },
  {
    id: 2,
    titulo: "Feria Gastronómica Cultural",
    descripcion: "Evento cultural para promover la gastronomía local",
    fechaInicio: "2024-01-25T10:00:00",
    fechaFin: "2024-01-25T18:00:00",
    lugar: "Plaza Central",
    tipo: "cultural",
    estado: "programado"
  }
];

export const documentosData = [
  {
    id: 1,
    nombre: "Acta Sesión Enero 2024",
    tipo: "acta",
    categoria: "sesiones",
    fechaCreacion: "2024-01-15",
    archivo: "acta_enero_2024.pdf",
    version: "1.0",
    autor: "Secretario GAD",
    estado: "aprobado"
  },
  {
    id: 2,
    nombre: "Resolución No. 001-2024",
    tipo: "resolucion",
    categoria: "normativa",
    fechaCreacion: "2024-01-10",
    archivo: "resolucion_001_2024.pdf",
    version: "1.0",
    autor: "Presidente GAD",
    estado: "vigente"
  }
];

export const presupuestoData = {
  resumen: {
    presupuestoTotal: 2000000,
    ejecutado: 1450000,
    porcentajeEjecucion: 72.5,
    pendiente: 550000
  },
  categorias: [
    {
      nombre: "Infraestructura",
      presupuestado: 800000,
      ejecutado: 580000,
      porcentaje: 72.5
    },
    {
      nombre: "Servicios Básicos",
      presupuestado: 600000,
      ejecutado: 450000,
      porcentaje: 75
    },
    {
      nombre: "Programas Sociales",
      presupuestado: 400000,
      ejecutado: 280000,
      porcentaje: 70
    },
    {
      nombre: "Administración",
      presupuestado: 200000,
      ejecutado: 140000,
      porcentaje: 70
    }
  ]
};

export const turismoData = [
  {
    id: 1,
    nombre: "Cascada El Salto",
    descripcion: "Hermosa cascada natural ubicada en las montañas de Membrillal",
    categoria: "natural",
    ubicacion: "Sector El Salto",
    coordenadas: { lat: -1.234567, lng: -78.123456 },
    imagenes: ["/api/placeholder/600/400"],
    servicios: ["guias", "senderos", "miradores"],
    estado: "activo"
  },
  {
    id: 2,
    nombre: "Iglesia Colonial San José",
    descripcion: "Edificación colonial del siglo XVIII, patrimonio cultural de la parroquia",
    categoria: "cultural",
    ubicacion: "Centro Parroquial",
    coordenadas: { lat: -1.234568, lng: -78.123457 },
    imagenes: ["/api/placeholder/600/400"],
    servicios: ["visitas_guiadas", "ceremonias"],
    estado: "activo"
  }
];

export const mockParroquiaData = [
  {
    id: 1,
    titulo: 'Fundación de Membrillal',
    contenido: 'La parroquia Membrillal fue fundada en 1952, estableciéndose como una importante zona agrícola y ganadera de la región. Su nombre proviene de la abundante presencia de árboles de membrillo en la zona.',
    tipo: 'historia',
    fechaCreacion: '2024-01-15',
    estado: 'publicado'
  },
  {
    id: 2,
    titulo: 'Desarrollo Económico',
    contenido: 'Durante las últimas décadas, Membrillal ha experimentado un crecimiento significativo en la producción agrícola, especialmente en cultivos de cacao, café y frutas tropicales.',
    tipo: 'historia',
    fechaCreacion: '2024-01-16',
    estado: 'publicado'
  },
  {
    id: 3,
    titulo: 'Ubicación Geográfica',
    contenido: 'Membrillal se encuentra ubicada en la provincia de El Oro, al sur del Ecuador, con una superficie aproximada de 45.8 km². Limita al norte con la parroquia de Río Bonito.',
    tipo: 'geografia',
    fechaCreacion: '2024-01-17',
    estado: 'publicado'
  },
  {
    id: 4,
    titulo: 'Relieve y Topografía',
    contenido: 'El territorio presenta un relieve variado que va desde terrenos planos en la zona central hasta colinas y montañas en los límites parroquiales, con altitudes que oscilan entre 50 y 800 metros sobre el nivel del mar.',
    tipo: 'geografia',
    fechaCreacion: '2024-01-18',
    estado: 'publicado'
  },
  {
    id: 5,
    titulo: 'Clima Tropical',
    contenido: 'Membrillal presenta un clima tropical húmedo con temperatura promedio de 26°C. La época lluviosa se extiende de diciembre a mayo, mientras que la época seca va de junio a noviembre.',
    tipo: 'clima',
    fechaCreacion: '2024-01-19',
    estado: 'publicado'
  },
  {
    id: 6,
    titulo: 'Precipitaciones',
    contenido: 'La precipitación anual promedio es de 1,200mm, siendo los meses de enero a abril los más lluviosos. Esta característica climática favorece la agricultura tropical.',
    tipo: 'clima',
    fechaCreacion: '2024-01-20',
    estado: 'publicado'
  },
  {
    id: 7,
    titulo: 'Población Total',
    contenido: 'Según el último censo, Membrillal cuenta con aproximadamente 3,247 habitantes, distribuidos en 897 familias. La densidad poblacional es de 71 habitantes por km².',
    tipo: 'demografia',
    fechaCreacion: '2024-01-21',
    estado: 'publicado'
  },
  {
    id: 8,
    titulo: 'Distribución por Edad',
    contenido: 'La población se distribuye con un 32% menores de 18 años, 58% adultos entre 18-65 años, y 10% adultos mayores. La edad promedio de la población es de 28 años.',
    tipo: 'demografia',
    fechaCreacion: '2024-01-22',
    estado: 'publicado'
  }
];

export const mockOrganizacionData = [
  {
    id: 1,
    nombre: 'Ing. Carlos Mendoza',
    cargo: 'Presidente del GAD',
    telefono: '07-2956123',
    email: 'presidente@gadmembrillal.gob.ec',
    periodo: '2023-2027',
    biografia: 'Ingeniero Civil con 15 años de experiencia en gestión pública y desarrollo comunitario.',
    foto: '/placeholder.svg',
    tipo: 'autoridad'
  },
  {
    id: 2,
    nombre: 'Lcda. María Torres',
    cargo: 'Vicepresidenta',
    telefono: '07-2956124',
    email: 'vicepresidente@gadmembrillal.gob.ec',
    periodo: '2023-2027',
    biografia: 'Licenciada en Administración Pública con experiencia en proyectos sociales.',
    foto: '/placeholder.svg',
    tipo: 'autoridad'
  },
  {
    id: 3,
    nombre: 'Dr. Luis Ramírez',
    cargo: 'Vocal Principal',
    telefono: '07-2956125',
    email: 'vocal1@gadmembrillal.gob.ec',
    periodo: '2023-2027',
    biografia: 'Médico y líder comunitario comprometido con el desarrollo rural.',
    foto: '/placeholder.svg',
    tipo: 'autoridad'
  }
];

export const mockComisionesData = [
  {
    id: 1,
    nombre: 'Comisión de Planificación y Presupuesto',
    descripcion: 'Encargada de la planificación estratégica y elaboración del presupuesto participativo',
    presidente: 'Ing. Carlos Mendoza',
    miembros: ['Lcda. María Torres', 'Dr. Luis Ramírez'],
    reuniones: 'Primer lunes de cada mes',
    estado: 'activa'
  },
  {
    id: 2,
    nombre: 'Comisión de Obras Públicas',
    descripcion: 'Supervisa y coordina los proyectos de infraestructura y obras públicas',
    presidente: 'Lcda. María Torres',
    miembros: ['Ing. Pedro Silva', 'Arq. Ana López'],
    reuniones: 'Segundo miércoles de cada mes',
    estado: 'activa'
  },
  {
    id: 3,
    nombre: 'Comisión de Medio Ambiente',
    descripcion: 'Promueve políticas ambientales y supervisa proyectos de conservación',
    presidente: 'Dr. Luis Ramírez',
    miembros: ['Biol. Carmen Ruiz', 'Ing. For. Miguel Castro'],
    reuniones: 'Tercer viernes de cada mes',
    estado: 'activa'
  }
];

export const mockTransparenciaData = [
  {
    id: 1,
    titulo: 'Informe de Rendición de Cuentas 2023',
    tipo: 'rendicion',
    descripcion: 'Informe completo de la gestión y ejecución presupuestaria del año 2023',
    archivo: 'rendicion_cuentas_2023.pdf',
    fechaPublicacion: '2024-01-10',
    categoria: 'anual',
    estado: 'publicado'
  },
  {
    id: 2,
    titulo: 'Licitación Mejoramiento Vial Sector Centro',
    tipo: 'licitacion',
    descripcion: 'Proceso de licitación para mejoramiento de vías en el sector centro de la parroquia',
    archivo: 'licitacion_vial_2024.pdf',
    fechaPublicacion: '2024-01-12',
    categoria: 'obras',
    estado: 'en_proceso',
    montoReferencial: 150000
  }
];

export const mockSolicitudesData = [
  {
    id: 1,
    numeroSolicitud: 'SI-2024-001',
    solicitante: 'Pedro Martínez',
    tipoInformacion: 'Ejecución presupuestaria',
    fechaSolicitud: '2024-01-15',
    estado: 'pendiente',
    descripcion: 'Solicitud de información sobre la ejecución del presupuesto 2023',
    plazoRespuesta: '2024-01-25'
  }
];

export const mockEventosData = [
  {
    id: 1,
    titulo: 'Sesión Ordinaria del Consejo Parroquial',
    descripcion: 'Sesión mensual ordinaria del consejo parroquial para revisar proyectos y presupuesto',
    fechaInicio: '2024-02-05T09:00:00',
    fechaFin: '2024-02-05T12:00:00',
    lugar: 'Casa Parroquial de Membrillal',
    tipo: 'reunion',
    estado: 'programado',
    responsable: 'Ing. Carlos Mendoza'
  },
  {
    id: 2,
    titulo: 'Feria Cultural Gastronómica',
    descripcion: 'Evento para promocionar la gastronomía y cultura local de Membrillal',
    fechaInicio: '2024-02-15T10:00:00',
    fechaFin: '2024-02-15T18:00:00',
    lugar: 'Plaza Central',
    tipo: 'cultural',
    estado: 'programado',
    responsable: 'Lcda. María Torres'
  }
];