import { IDataStore } from './interfaces';
import type { ID } from '@/domain/models/types';

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class LocalStorageStore implements IDataStore {
  async read<T>(collection: string): Promise<T[]> {
    await delay(200);
    try {
      const data = localStorage.getItem(collection);
      if (!data) return [];
      return JSON.parse(data) as T[];
    } catch (error) {
      console.error(`Error reading ${collection}:`, error);
      return [];
    }
  }

  async write<T>(collection: string, value: T[]): Promise<void> {
    await delay(200);
    try {
      localStorage.setItem(collection, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing ${collection}:`, error);
      throw error;
    }
  }

  async nextId(collection: string): Promise<ID> {
    await delay(50);
    // Use crypto.randomUUID if available (browser API)
    if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
      return window.crypto.randomUUID();
    }
    // Fallback for environments without crypto.randomUUID
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  nowISO(): string {
    return new Date().toISOString();
  }
}

