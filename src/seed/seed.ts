import { dataStore } from '@/data/store';
import { STORAGE_KEYS } from '@/data/store/keys';
import type { Parroquia, Autoridad, Comision, Documento, Noticia, Evento, TramiteDef, Usuario, Comunicacion, KPIsBase } from '@/domain/models/types';

export async function seedDatabase(): Promise<void> {
  // Check if already seeded
  const version = localStorage.getItem(STORAGE_KEYS.SEED_VERSION);
  if (version === '1') {
    console.log('Database already seeded');
    return;
  }

  const now = new Date().toISOString();
  const hoy = new Date();
  const hoyStr = hoy.toISOString().split('T')[0];

  // Parroquia
  const parroquia: Parroquia = {
    id: await dataStore.nextId(STORAGE_KEYS.PARROQUIA),
    titulo: 'GAD Parroquial Rural de Membrillal',
    contenidoHtml: `
      <h2>Historia</h2>
      <p>El GAD Parroquial Rural de Membrillal es una entidad pública que trabaja por el desarrollo sostenible y el bienestar de nuestra comunidad. Fundado con el propósito de mejorar la calidad de vida de nuestros habitantes, promovemos el crecimiento económico, social y cultural de la parroquia.</p>
      
      <h2>Visión</h2>
      <p>Ser una parroquia modelo en desarrollo sostenible, con una comunidad unida, próspera y comprometida con el cuidado del medio ambiente y la preservación de nuestras tradiciones.</p>
      
      <h2>Misión</h2>
      <p>Gestionar de manera eficiente y transparente los recursos públicos, promoviendo el desarrollo integral de la parroquia mediante la participación ciudadana y el trabajo conjunto con las instituciones públicas y privadas.</p>
    `,
    updatedAt: now,
  };
  await dataStore.write(STORAGE_KEYS.PARROQUIA, [parroquia]);

  // Autoridades
  const autoridades: Autoridad[] = [
    {
      id: await dataStore.nextId(STORAGE_KEYS.AUTORIDADES),
      nombre: 'Juan Carlos Pérez',
      cargo: 'Presidente',
      periodo: '2024-2027',
      descripcion: 'Ingeniero en Administración, con amplia experiencia en gestión pública.',
    },
    {
      id: await dataStore.nextId(STORAGE_KEYS.AUTORIDADES),
      nombre: 'María Elena González',
      cargo: 'Vicepresidenta',
      periodo: '2024-2027',
      descripcion: 'Licenciada en Trabajo Social, especialista en desarrollo comunitario.',
    },
    {
      id: await dataStore.nextId(STORAGE_KEYS.AUTORIDADES),
      nombre: 'Carlos Alberto Ramírez',
      cargo: 'Secretario',
      periodo: '2024-2027',
      descripcion: 'Abogado, experto en normativa y marco legal.',
    },
    {
      id: await dataStore.nextId(STORAGE_KEYS.AUTORIDADES),
      nombre: 'Ana Lucía Martínez',
      cargo: 'Tesorera',
      periodo: '2024-2027',
      descripcion: 'Contadora Pública, especialista en finanzas públicas.',
    },
    {
      id: await dataStore.nextId(STORAGE_KEYS.AUTORIDADES),
      nombre: 'Roberto Fernando Silva',
      cargo: 'Vocal',
      periodo: '2024-2027',
      descripcion: 'Ingeniero Ambiental, enfocado en sostenibilidad.',
    },
    {
      id: await dataStore.nextId(STORAGE_KEYS.AUTORIDADES),
      nombre: 'Patricia Isabel Torres',
      cargo: 'Vocal',
      periodo: '2024-2027',
      descripcion: 'Educadora, promotora de programas sociales.',
    },
  ];
  await dataStore.write(STORAGE_KEYS.AUTORIDADES, autoridades);

  // Comisiones
  const comisiones: Comision[] = [
    {
      id: await dataStore.nextId(STORAGE_KEYS.COMISIONES),
      nombre: 'Comisión de Obras Públicas',
      integrantes: ['Juan Carlos Pérez', 'Carlos Alberto Ramírez', 'Roberto Fernando Silva'],
      objetivo: 'Supervisar y gestionar proyectos de infraestructura y obras públicas.',
    },
    {
      id: await dataStore.nextId(STORAGE_KEYS.COMISIONES),
      nombre: 'Comisión de Ambiente',
      integrantes: ['Roberto Fernando Silva', 'Patricia Isabel Torres', 'María Elena González'],
      objetivo: 'Promover políticas ambientales y cuidado del ecosistema local.',
    },
    {
      id: await dataStore.nextId(STORAGE_KEYS.COMISIONES),
      nombre: 'Comisión de Desarrollo Social',
      integrantes: ['María Elena González', 'Patricia Isabel Torres', 'Ana Lucía Martínez'],
      objetivo: 'Impulsar programas de desarrollo social y comunitario.',
    },
  ];
  await dataStore.write(STORAGE_KEYS.COMISIONES, comisiones);

  // Documentos
  const documentos: Documento[] = [
    {
      id: await dataStore.nextId(STORAGE_KEYS.DOCUMENTOS),
      titulo: 'Rendición de Cuentas 2023',
      categoria: 'Rendicion',
      anio: 2023,
      url: '#',
      resumen: 'Informe de gestión y rendición de cuentas del ejercicio fiscal 2023.',
      publishedAt: '2024-01-15T00:00:00Z',
    },
    {
      id: await dataStore.nextId(STORAGE_KEYS.DOCUMENTOS),
      titulo: 'Rendición de Cuentas 2024',
      categoria: 'Rendicion',
      anio: 2024,
      url: '#',
      resumen: 'Informe de gestión y rendición de cuentas del ejercicio fiscal 2024.',
      publishedAt: '2024-12-15T00:00:00Z',
    },
    {
      id: await dataStore.nextId(STORAGE_KEYS.DOCUMENTOS),
      titulo: 'POA 2024 - Plan Operativo Anual',
      categoria: 'Presupuesto',
      anio: 2024,
      url: '#',
      resumen: 'Plan Operativo Anual con presupuesto asignado para el año 2024.',
      publishedAt: '2024-01-10T00:00:00Z',
    },
    {
      id: await dataStore.nextId(STORAGE_KEYS.DOCUMENTOS),
      titulo: 'Ejecución Presupuestaria 2024',
      categoria: 'Presupuesto',
      anio: 2024,
      url: '#',
      resumen: 'Reporte de ejecución presupuestaria hasta el tercer trimestre 2024.',
      publishedAt: '2024-10-01T00:00:00Z',
    },
    {
      id: await dataStore.nextId(STORAGE_KEYS.DOCUMENTOS),
      titulo: 'Licitación Pública - Adquisiciones Q3 2024',
      categoria: 'Licitacion',
      anio: 2024,
      url: '#',
      resumen: 'Proceso de licitación para adquisición de bienes y servicios tercer trimestre.',
      publishedAt: '2024-07-15T00:00:00Z',
    },
    {
      id: await dataStore.nextId(STORAGE_KEYS.DOCUMENTOS),
      titulo: 'Ordenanza de Organización Territorial',
      categoria: 'MarcoLegal',
      anio: 2024,
      url: '#',
      resumen: 'Ordenanza que regula la organización territorial y administrativa del GAD.',
      publishedAt: '2024-03-20T00:00:00Z',
    },
  ];
  await dataStore.write(STORAGE_KEYS.DOCUMENTOS, documentos);

  // Noticias
  const fechaNoticia1 = new Date(hoy);
  fechaNoticia1.setDate(fechaNoticia1.getDate() - 3);
  const fechaNoticia2 = new Date(hoy);
  fechaNoticia2.setDate(fechaNoticia2.getDate() - 5);
  const fechaNoticia3 = new Date(hoy);
  fechaNoticia3.setDate(fechaNoticia3.getDate() - 6);

  const noticias: Noticia[] = [
    {
      id: await dataStore.nextId(STORAGE_KEYS.NOTICIAS),
      titulo: 'Inauguración del nuevo centro de salud comunitario',
      categoria: 'Salud',
      cuerpoHtml: `
        <p>El GAD Parroquial de Membrillal se complace en anunciar la inauguración del nuevo centro de salud comunitario, que beneficiará a más de 500 familias de la zona rural.</p>
        <p>Este centro cuenta con consultorios médicos, sala de emergencias y farmacia comunitaria, mejorando significativamente el acceso a servicios de salud en nuestra parroquia.</p>
        <p>La inversión realizada asciende a $150,000 y fue financiada mediante convenio con el Ministerio de Salud Pública.</p>
      `,
      vistas: 245,
      etiquetas: ['salud', 'infraestructura', 'comunidad'],
      publishedAt: fechaNoticia1.toISOString(),
    },
    {
      id: await dataStore.nextId(STORAGE_KEYS.NOTICIAS),
      titulo: 'Programa de capacitación en agricultura sostenible',
      categoria: 'Agricultura',
      cuerpoHtml: `
        <p>Iniciamos un nuevo programa de capacitación dirigido a productores agrícolas de la parroquia, enfocado en técnicas de agricultura sostenible y orgánica.</p>
        <p>El programa incluye talleres prácticos, asesoría técnica y apoyo en la comercialización de productos orgánicos.</p>
        <p>Las inscripciones están abiertas hasta el próximo mes. Para más información, acérquese a las oficinas del GAD.</p>
      `,
      vistas: 189,
      etiquetas: ['agricultura', 'capacitación', 'desarrollo'],
      publishedAt: fechaNoticia2.toISOString(),
    },
    {
      id: await dataStore.nextId(STORAGE_KEYS.NOTICIAS),
      titulo: 'Mejoramiento de vías rurales – Fase II',
      categoria: 'Infraestructura',
      cuerpoHtml: `
        <p>Continuamos con la segunda fase del proyecto de mejoramiento de vías rurales, que beneficiará a las comunidades de los sectores más alejados.</p>
        <p>Esta fase incluye la construcción de 8 kilómetros de vías asfaltadas y el mejoramiento de 12 kilómetros de vías de lastre.</p>
        <p>El proyecto tiene un plazo de ejecución de 6 meses y generará más de 50 empleos directos para la comunidad.</p>
      `,
      vistas: 312,
      etiquetas: ['infraestructura', 'vías', 'trabajo'],
      publishedAt: fechaNoticia3.toISOString(),
    },
  ];
  await dataStore.write(STORAGE_KEYS.NOTICIAS, noticias);

  // Eventos
  const fechaEvento1 = new Date(hoy);
  fechaEvento1.setDate(fechaEvento1.getDate() + 10);
  const fechaEvento2 = new Date(hoy);
  fechaEvento2.setDate(fechaEvento2.getDate() + 18);
  const fechaEvento3 = new Date(hoy);
  fechaEvento3.setDate(fechaEvento3.getDate() + 25);

  const eventos: Evento[] = [
    {
      id: await dataStore.nextId(STORAGE_KEYS.EVENTOS),
      titulo: 'Asamblea Parroquial',
      fecha: fechaEvento1.toISOString().split('T')[0],
      hora: '09:00',
      lugar: 'Salón de Actos del GAD',
      descripcionHtml: '<p>Asamblea general de la parroquia para tratar temas de interés comunitario y rendición de cuentas.</p>',
      estado: 'programado',
      etiquetas: ['asamblea', 'participación'],
      createdAt: now,
    },
    {
      id: await dataStore.nextId(STORAGE_KEYS.EVENTOS),
      titulo: 'Feria de Emprendimiento Local',
      fecha: fechaEvento2.toISOString().split('T')[0],
      hora: '08:00',
      lugar: 'Plaza Central',
      descripcionHtml: '<p>Feria donde los emprendedores locales podrán exhibir y comercializar sus productos.</p>',
      estado: 'programado',
      etiquetas: ['feria', 'emprendimiento', 'comercio'],
      createdAt: now,
    },
    {
      id: await dataStore.nextId(STORAGE_KEYS.EVENTOS),
      titulo: 'Taller de Gestión Ambiental',
      fecha: fechaEvento3.toISOString().split('T')[0],
      hora: '14:00',
      lugar: 'Centro Comunitario',
      descripcionHtml: '<p>Taller práctico sobre gestión de residuos, reciclaje y cuidado del medio ambiente.</p>',
      estado: 'programado',
      etiquetas: ['ambiente', 'capacitación'],
      createdAt: now,
    },
  ];
  await dataStore.write(STORAGE_KEYS.EVENTOS, eventos);

  // Trámites Definiciones
  const tramitesDef: TramiteDef[] = [
    {
      id: await dataStore.nextId(STORAGE_KEYS.TRAMITES_DEF),
      nombre: 'Certificado de Residencia',
      tipo: 'Certificacion',
      costo: 0,
      tiempoDias: '1-2',
      requisitosHtml: `
        <ul>
          <li>Copia de cédula de identidad</li>
          <li>Comprobante de domicilio (recibo de luz, agua o teléfono)</li>
          <li>Adjuntar documentos escaneados</li>
        </ul>
      `,
      activo: true,
    },
    {
      id: await dataStore.nextId(STORAGE_KEYS.TRAMITES_DEF),
      nombre: 'Permiso de Funcionamiento',
      tipo: 'Permiso',
      costo: 25,
      tiempoDias: '5-8',
      requisitosHtml: `
        <ul>
          <li>Copia de cédula de identidad</li>
          <li>RUC (Registro Único de Contribuyentes)</li>
          <li>Planos del local comercial</li>
          <li>Certificado de no adeudar al GAD</li>
          <li>Adjuntar todos los documentos requeridos</li>
        </ul>
      `,
      activo: true,
    },
    {
      id: await dataStore.nextId(STORAGE_KEYS.TRAMITES_DEF),
      nombre: 'Certificado de No Adeudar',
      tipo: 'Certificacion',
      costo: 0,
      tiempoDias: '1',
      requisitosHtml: `
        <ul>
          <li>Copia de cédula de identidad</li>
          <li>Solicitud escrita</li>
          <li>Adjuntar documento de identidad</li>
        </ul>
      `,
      activo: true,
    },
  ];
  await dataStore.write(STORAGE_KEYS.TRAMITES_DEF, tramitesDef);

  // Usuarios
  const usuarios: Usuario[] = [
    {
      id: await dataStore.nextId(STORAGE_KEYS.USUARIOS),
      nombre: 'Administrador Sistema',
      email: 'admin@gad.gob.ec',
      passwordHash: btoa('admin123'), // Simple encoding for demo
      rol: 'Administrador',
      activo: true,
    },
  ];
  await dataStore.write(STORAGE_KEYS.USUARIOS, usuarios);

  // KPIs Base
  const kpisBase: KPIsBase = {
    presupuesto: 2000000,
    ejecutado: 1450000,
    transparencia: {
      recibidas: 37,
      respondidas: 25,
      pendientes: 12,
    },
  };
  await dataStore.write(STORAGE_KEYS.KPIS_BASE, [kpisBase]);

  // Comunicaciones
  const comunicaciones: Comunicacion[] = [
    {
      id: await dataStore.nextId(STORAGE_KEYS.COMUNICACIONES),
      tipo: 'notificacion',
      titulo: 'Nueva noticia publicada',
      mensaje: 'Se ha publicado una nueva noticia: "Inauguración del nuevo centro de salud comunitario"',
      leida: false,
      createdAt: fechaNoticia1.toISOString(),
      related: {
        tipo: 'noticia',
        id: noticias[0].id,
      },
    },
    {
      id: await dataStore.nextId(STORAGE_KEYS.COMUNICACIONES),
      tipo: 'tarea',
      titulo: 'Nuevo evento programado',
      mensaje: 'Se ha programado un nuevo evento: "Asamblea Parroquial"',
      leida: false,
      createdAt: now,
      related: {
        tipo: 'evento',
        id: eventos[0].id,
      },
    },
  ];
  await dataStore.write(STORAGE_KEYS.COMUNICACIONES, comunicaciones);

  // Trámites Instancias (vacío inicialmente)
  await dataStore.write(STORAGE_KEYS.TRAMITES_INST, []);

  // Mark as seeded
  localStorage.setItem(STORAGE_KEYS.SEED_VERSION, '1');
  console.log('Database seeded successfully');
}

