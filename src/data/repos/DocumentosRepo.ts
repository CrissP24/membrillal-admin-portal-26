import { BaseRepository } from './BaseRepository';
import type { Documento } from '@/domain/models/types';
import { STORAGE_KEYS } from '../store/keys';

export class DocumentosRepo extends BaseRepository<Documento> {
  protected collectionKey = STORAGE_KEYS.DOCUMENTOS;
}

export const documentosRepo = new DocumentosRepo();

