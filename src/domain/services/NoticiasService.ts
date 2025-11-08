import { noticiasRepo } from '@/data/repos';
import type { ID, Noticia } from '@/domain/models/types';
import type { QueryOpts } from '@/data/store/interfaces';

export class NoticiasService {
  async list(opts?: QueryOpts): Promise<{ items: Noticia[]; total: number }> {
    return await noticiasRepo.list(opts);
  }

  async get(id: ID): Promise<Noticia | null> {
    return await noticiasRepo.get(id);
  }

  async publicar(input: Partial<Noticia>): Promise<Noticia> {
    const now = new Date().toISOString();
    return await noticiasRepo.create({
      ...input,
      vistas: 0,
      publishedAt: now,
    } as Partial<Noticia>);
  }

  async editar(id: ID, patch: Partial<Noticia>): Promise<Noticia> {
    return await noticiasRepo.update(id, patch);
  }

  async eliminar(id: ID): Promise<void> {
    return await noticiasRepo.remove(id);
  }

  async incrementarVistas(id: ID): Promise<Noticia> {
    const noticia = await noticiasRepo.get(id);
    if (!noticia) {
      throw new Error('Noticia no encontrada');
    }
    return await noticiasRepo.update(id, { vistas: noticia.vistas + 1 });
  }

  async getByCategoria(categoria: string): Promise<Noticia[]> {
    const result = await noticiasRepo.list({
      filters: { categoria },
      orderBy: 'publishedAt',
      orderDir: 'desc',
    });
    return result.items;
  }

  async getByEtiqueta(etiqueta: string): Promise<Noticia[]> {
    const result = await noticiasRepo.list();
    return result.items.filter(n => n.etiquetas?.includes(etiqueta));
  }
}

export const noticiasService = new NoticiasService();

