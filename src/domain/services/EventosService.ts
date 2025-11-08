import { eventosRepo } from '@/data/repos';
import type { ID, Evento, EstadoEvento } from '@/domain/models/types';
import type { QueryOpts } from '@/data/store/interfaces';

export class EventosService {
  async list(opts?: QueryOpts): Promise<{ items: Evento[]; total: number }> {
    return await eventosRepo.list(opts);
  }

  async get(id: ID): Promise<Evento | null> {
    return await eventosRepo.get(id);
  }

  async programar(input: Partial<Evento>): Promise<Evento> {
    const now = new Date().toISOString();
    return await eventosRepo.create({
      ...input,
      estado: 'programado',
      createdAt: now,
    } as Partial<Evento>);
  }

  async actualizar(id: ID, patch: Partial<Evento>): Promise<Evento> {
    return await eventosRepo.update(id, patch);
  }

  async cambiarEstado(id: ID, estado: EstadoEvento): Promise<Evento> {
    return await eventosRepo.update(id, { estado });
  }

  async proximosEventos(): Promise<Evento[]> {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const result = await eventosRepo.list({
      filters: { estado: 'programado' },
      orderBy: 'fecha',
      orderDir: 'asc',
    });

    return result.items.filter(evento => {
      const fechaEvento = new Date(evento.fecha);
      fechaEvento.setHours(0, 0, 0, 0);
      return fechaEvento >= hoy;
    });
  }
}

export const eventosService = new EventosService();

