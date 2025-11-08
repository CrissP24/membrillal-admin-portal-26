import { BaseRepository } from './BaseRepository';
import type { Noticia } from '@/domain/models/types';
import { STORAGE_KEYS } from '../store/keys';

export class NoticiasRepo extends BaseRepository<Noticia> {
  protected collectionKey = STORAGE_KEYS.NOTICIAS;
}

export const noticiasRepo = new NoticiasRepo();

