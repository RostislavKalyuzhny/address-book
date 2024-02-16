
import { IStorage } from './storage.interface';
//import { DataStorageStrategy } from './data-storage-strategy.interface';

/**
 * Class representing a storage manager for managing different storage strategies.
 */
export class StorageManager {
  private storage: IStorage;

  constructor(storageStrategy: IStorage) {
    this.storage = storageStrategy;
  }

  /**
   * Sets the storage strategy for the manager.
   * @param {IStorage} storageStrategy - The storage strategy to set.
   */
  setStorage(storageStrategy: IStorage) {
    this.storage = storageStrategy;
  }

  /**
   * Loads data from storage using the current storage strategy.
   * @returns {Promise<any>} A Promise that resolves to the loaded data.
   */
  async loadDataFromStorage(): Promise<any> {
    return this.storage.load();
  }

  /**
   * Saves data to storage using the current storage strategy.
   * @param {any} data - The data to save.
   */
  async saveDataToStorage(data: any) {
    await this.storage.save(data);
  }
}