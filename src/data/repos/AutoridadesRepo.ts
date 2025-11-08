import { BaseRepository } from './BaseRepository';
import type { Autoridad } from '@/domain/models/types';
import { STORAGE_KEYS } from '../store/keys';

export class AutoridadesRepo extends BaseRepository<Autoridad> {
  protected collectionKey = STORAGE_KEYS.AUTORIDADES;
}

export const autoridadesRepo = new AutoridadesRepo();

