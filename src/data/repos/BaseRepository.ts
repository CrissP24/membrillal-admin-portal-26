import type { IRepository, QueryOpts } from '../store/interfaces';
import type { ID } from '@/domain/models/types';
import { dataStore } from '../store';
import { STORAGE_KEYS } from '../store/keys';

export abstract class BaseRepository<T extends { id: ID }> implements IRepository<T> {
  protected abstract collectionKey: string;

  async list(opts?: QueryOpts): Promise<{ items: T[]; total: number }> {
    let items = await dataStore.read<T>(this.collectionKey);

    // Apply search query
    if (opts?.q) {
      const query = opts.q.toLowerCase();
      items = items.filter(item => {
        const str = JSON.stringify(item).toLowerCase();
        return str.includes(query);
      });
    }

    // Apply filters
    if (opts?.filters) {
      items = items.filter(item => {
        return Object.entries(opts.filters!).every(([key, value]) => {
          const itemValue = (item as any)[key];
          if (value === undefined || value === null) return true;
          if (Array.isArray(value)) {
            return value.includes(itemValue);
          }
          return itemValue === value || String(itemValue).toLowerCase().includes(String(value).toLowerCase());
        });
      });
    }

    // Apply sorting
    if (opts?.orderBy) {
      items.sort((a, b) => {
        const aVal = (a as any)[opts.orderBy!];
        const bVal = (b as any)[opts.orderBy!];
        const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return opts.orderDir === 'desc' ? -comparison : comparison;
      });
    }

    const total = items.length;

    // Apply pagination
    if (opts?.page !== undefined && opts?.pageSize !== undefined) {
      const start = (opts.page - 1) * opts.pageSize;
      const end = start + opts.pageSize;
      items = items.slice(start, end);
    }

    return { items, total };
  }

  async get(id: ID): Promise<T | null> {
    const items = await dataStore.read<T>(this.collectionKey);
    return items.find(item => item.id === id) || null;
  }

  async create(input: Partial<T>): Promise<T> {
    const items = await dataStore.read<T>(this.collectionKey);
    const id = await dataStore.nextId(this.collectionKey);
    const now = dataStore.nowISO();
    
    const newItem = {
      ...input,
      id,
      createdAt: now,
      updatedAt: now,
    } as T;

    items.push(newItem);
    await dataStore.write(this.collectionKey, items);
    return newItem;
  }

  async update(id: ID, patch: Partial<T>): Promise<T> {
    const items = await dataStore.read<T>(this.collectionKey);
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) {
      throw new Error(`Item with id ${id} not found`);
    }

    const updated = {
      ...items[index],
      ...patch,
      id,
      updatedAt: dataStore.nowISO(),
    } as T;

    items[index] = updated;
    await dataStore.write(this.collectionKey, items);
    return updated;
  }

  async remove(id: ID): Promise<void> {
    const items = await dataStore.read<T>(this.collectionKey);
    const filtered = items.filter(item => item.id !== id);
    await dataStore.write(this.collectionKey, filtered);
  }
}

