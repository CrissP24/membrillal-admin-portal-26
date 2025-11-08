import { dataStore } from '@/data/store';
import { STORAGE_KEYS } from '@/data/store/keys';
import { noticiasRepo, eventosRepo, tramiteInstRepo } from '@/data/repos';
import type { KPIsBase } from '@/domain/models/types';

export class KPIsService {
  async getEjecucionPresupuestaria(): Promise<{ ejecutado: number; presupuesto: number; porcentaje: number }> {
    const kpis = await dataStore.read<KPIsBase>(STORAGE_KEYS.KPIS_BASE);
    const base = kpis[0] || { presupuesto: 2000000, ejecutado: 1450000, transparencia: { recibidas: 37, respondidas: 25, pendientes: 12 } };
    
    const porcentaje = (base.ejecutado / base.presupuesto) * 100;
    
    return {
      ejecutado: base.ejecutado,
      presupuesto: base.presupuesto,
      porcentaje: Math.round(porcentaje * 100) / 100,
    };
  }

  async getSolicitudesInformacion(): Promise<{ recibidas: number; respondidas: number; pendientes: number; tasa: number }> {
    const kpis = await dataStore.read<KPIsBase>(STORAGE_KEYS.KPIS_BASE);
    const base = kpis[0] || { presupuesto: 2000000, ejecutado: 1450000, transparencia: { recibidas: 37, respondidas: 25, pendientes: 12 } };
    
    const transparencia = base.transparencia;
    const tasa = transparencia.recibidas > 0 
      ? (transparencia.respondidas / transparencia.recibidas) * 100 
      : 0;
    
    return {
      recibidas: transparencia.recibidas,
      respondidas: transparencia.respondidas,
      pendientes: transparencia.pendientes,
      tasa: Math.round(tasa * 100) / 100,
    };
  }

  async getNoticiasEsteMes(): Promise<number> {
    const hoy = new Date();
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    
    const result = await noticiasRepo.list();
    return result.items.filter(noticia => {
      const fechaPub = new Date(noticia.publishedAt);
      return fechaPub >= inicioMes;
    }).length;
  }

  async getEventosProximos(): Promise<number> {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const result = await eventosRepo.list({
      filters: { estado: 'programado' },
    });
    
    return result.items.filter(evento => {
      const fechaEvento = new Date(evento.fecha);
      fechaEvento.setHours(0, 0, 0, 0);
      return fechaEvento >= hoy;
    }).length;
  }

  async getActividadReciente(limit: number = 10): Promise<any[]> {
    // This would typically come from ComunicacionesRepo
    // For now, we'll combine data from different sources
    const [noticias, eventos, tramites] = await Promise.all([
      noticiasRepo.list({ orderBy: 'publishedAt', orderDir: 'desc', pageSize: limit }),
      eventosRepo.list({ orderBy: 'createdAt', orderDir: 'desc', pageSize: limit }),
      tramiteInstRepo.list({ orderBy: 'createdAt', orderDir: 'desc', pageSize: limit }),
    ]);

    const actividades: any[] = [];

    noticias.items.forEach(n => {
      actividades.push({
        tipo: 'noticia',
        id: n.id,
        titulo: `Noticia publicada: ${n.titulo}`,
        fecha: n.publishedAt,
        icono: 'newspaper',
      });
    });

    eventos.items.forEach(e => {
      actividades.push({
        tipo: 'evento',
        id: e.id,
        titulo: `Evento programado: ${e.titulo}`,
        fecha: e.createdAt,
        icono: 'calendar',
      });
    });

    tramites.items.forEach(t => {
      actividades.push({
        tipo: 'tramite',
        id: t.id,
        titulo: `Nuevo trámite: ${t.folio}`,
        fecha: t.createdAt,
        icono: 'file-text',
      });
    });

    // Sort by date and limit
    actividades.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    return actividades.slice(0, limit);
  }
}

export const kpisService = new KPIsService();

