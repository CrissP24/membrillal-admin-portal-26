import { BaseRepository } from './BaseRepository';
import type { Parroquia } from '@/domain/models/types';
import { STORAGE_KEYS } from '../store/keys';

export class ParroquiaRepo extends BaseRepository<Parroquia> {
  protected collectionKey = STORAGE_KEYS.PARROQUIA;
}

export const parroquiaRepo = new ParroquiaRepo();

