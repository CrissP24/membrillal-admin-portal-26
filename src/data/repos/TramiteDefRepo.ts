import { BaseRepository } from './BaseRepository';
import type { TramiteDef } from '@/domain/models/types';
import { STORAGE_KEYS } from '../store/keys';

export class TramiteDefRepo extends BaseRepository<TramiteDef> {
  protected collectionKey = STORAGE_KEYS.TRAMITES_DEF;
}

export const tramiteDefRepo = new TramiteDefRepo();

