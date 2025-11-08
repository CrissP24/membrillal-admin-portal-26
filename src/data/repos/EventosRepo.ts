import { BaseRepository } from './BaseRepository';
import type { Evento } from '@/domain/models/types';
import { STORAGE_KEYS } from '../store/keys';

export class EventosRepo extends BaseRepository<Evento> {
  protected collectionKey = STORAGE_KEYS.EVENTOS;
}

export const eventosRepo = new EventosRepo();

