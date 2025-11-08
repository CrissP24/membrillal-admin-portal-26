import { BaseRepository } from './BaseRepository';
import type { TramiteInstancia } from '@/domain/models/types';
import { STORAGE_KEYS } from '../store/keys';

export class TramiteInstRepo extends BaseRepository<TramiteInstancia> {
  protected collectionKey = STORAGE_KEYS.TRAMITES_INST;

  async findByFolio(folio: string): Promise<TramiteInstancia | null> {
    const items = await this.list();
    return items.items.find(item => item.folio === folio) || null;
  }

  async findByDocumento(documento: string): Promise<TramiteInstancia[]> {
    const items = await this.list();
    return items.items.filter(item => item.ciudadano.documento === documento);
  }
}

export const tramiteInstRepo = new TramiteInstRepo();

