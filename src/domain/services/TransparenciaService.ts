import { documentosRepo } from '@/data/repos';
import type { ID, Documento, DocCategoria } from '@/domain/models/types';
import type { QueryOpts } from '@/data/store/interfaces';

export class TransparenciaService {
  async list(opts?: QueryOpts): Promise<{ items: Documento[]; total: number }> {
    return await documentosRepo.list(opts);
  }

  async get(id: ID): Promise<Documento | null> {
    return await documentosRepo.get(id);
  }

  async create(input: Partial<Documento>): Promise<Documento> {
    const now = new Date().toISOString();
    return await documentosRepo.create({
      ...input,
      publishedAt: now,
    } as Partial<Documento>);
  }

  async update(id: ID, patch: Partial<Documento>): Promise<Documento> {
    return await documentosRepo.update(id, patch);
  }

  async remove(id: ID): Promise<void> {
    return await documentosRepo.remove(id);
  }

  async getByCategoria(categoria: DocCategoria): Promise<Documento[]> {
    const result = await documentosRepo.list({
      filters: { categoria },
      orderBy: 'publishedAt',
      orderDir: 'desc',
    });
    return result.items;
  }

  async getByAnio(anio: number): Promise<Documento[]> {
    const result = await documentosRepo.list({
      filters: { anio },
      orderBy: 'publishedAt',
      orderDir: 'desc',
    });
    return result.items;
  }

  async getByCategoriaYAnio(categoria: DocCategoria, anio: number): Promise<Documento[]> {
    const result = await documentosRepo.list({
      filters: { categoria, anio },
      orderBy: 'publishedAt',
      orderDir: 'desc',
    });
    return result.items;
  }
}

export const transparenciaService = new TransparenciaService();

