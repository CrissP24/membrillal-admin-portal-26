import { IDataStore } from './interfaces';
import type { ID } from '@/domain/models/types';

// Placeholder for future REST API implementation
// This will be used when migrating from LocalStorage to API
export class RestStore implements IDataStore {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async read<T>(collection: string): Promise<T[]> {
    const response = await fetch(`${this.baseUrl}/${collection}`);
    if (!response.ok) {
      throw new Error(`Failed to read ${collection}`);
    }
    return response.json();
  }

  async write<T>(collection: string, value: T[]): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${collection}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    });
    if (!response.ok) {
      throw new Error(`Failed to write ${collection}`);
    }
  }

  async nextId(collection: string): Promise<ID> {
    const response = await fetch(`${this.baseUrl}/${collection}/next-id`);
    if (!response.ok) {
      throw new Error(`Failed to get next ID for ${collection}`);
    }
    const data = await response.json();
    return data.id;
  }

  nowISO(): string {
    return new Date().toISOString();
  }
}

