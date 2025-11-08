import { LocalStorageStore } from './LocalStorageStore';
import { RestStore } from './RestStore';
import type { IDataStore } from './interfaces';

// Factory to create the appropriate DataStore
// Change this to switch between LocalStorage and REST API
export const createDataStore = (): IDataStore => {
  // For now, always use LocalStorage
  // To switch to API: return new RestStore(process.env.VITE_API_URL || '/api');
  return new LocalStorageStore();
};

export const dataStore = createDataStore();

