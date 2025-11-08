import { BaseRepository } from './BaseRepository';
import type { Comunicacion } from '@/domain/models/types';
import { STORAGE_KEYS } from '../store/keys';

export class ComunicacionesRepo extends BaseRepository<Comunicacion> {
  protected collectionKey = STORAGE_KEYS.COMUNICACIONES;

  async getUnreadCount(): Promise<number> {
    const items = await this.list();
    return items.items.filter(item => !item.leida).length;
  }

  async markAsRead(id: string): Promise<Comunicacion> {
    return this.update(id, { leida: true });
  }
}

export const comunicacionesRepo = new ComunicacionesRepo();

