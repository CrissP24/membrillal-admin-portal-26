import type { ID } from '@/domain/models/types';

export interface QueryOpts {
  q?: string;
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderDir?: 'asc' | 'desc';
  filters?: Record<string, unknown>;
}

export interface IRepository<T> {
  list(opts?: QueryOpts): Promise<{ items: T[]; total: number }>;
  get(id: ID): Promise<T | null>;
  create(input: Partial<T>): Promise<T>;
  update(id: ID, patch: Partial<T>): Promise<T>;
  remove(id: ID): Promise<void>;
}

export interface IDataStore {
  read<T>(collection: string): Promise<T[]>;
  write<T>(collection: string, value: T[]): Promise<void>;
  nextId(collection: string): Promise<ID>;
  nowISO(): string;
}

