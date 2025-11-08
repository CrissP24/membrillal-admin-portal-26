import { BaseRepository } from './BaseRepository';
import type { Comision } from '@/domain/models/types';
import { STORAGE_KEYS } from '../store/keys';

export class ComisionesRepo extends BaseRepository<Comision> {
  protected collectionKey = STORAGE_KEYS.COMISIONES;
}

export const comisionesRepo = new ComisionesRepo();

