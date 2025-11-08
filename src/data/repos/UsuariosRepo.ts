import { BaseRepository } from './BaseRepository';
import type { Usuario } from '@/domain/models/types';
import { STORAGE_KEYS } from '../store/keys';

export class UsuariosRepo extends BaseRepository<Usuario> {
  protected collectionKey = STORAGE_KEYS.USUARIOS;

  async findByEmail(email: string): Promise<Usuario | null> {
    const items = await this.list();
    return items.items.find(item => item.email === email) || null;
  }
}

export const usuariosRepo = new UsuariosRepo();

