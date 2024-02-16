import fs from 'fs/promises';
import { IStorage } from './storage.interface';

/**
 * Class representing a storage mechanism using JSON format.
 * Implements the `IStorage` interface.
 */
export class JSONStorage implements IStorage {
  fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  /**
   * Loads data from storage in JSON format.
   * @returns {Promise<any>} A Promise that resolves to the loaded data.
   */
  async load(): Promise<any> {
    try {
      const fileContent = await fs.readFile(this.fileName, 'utf8');
      return JSON.parse(fileContent) || [];
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Saves data to storage in JSON format.
   * @param {object} data - The data to save.
   * @returns {Promise<void>} A Promise that resolves when the data is successfully saved.
   */
  async save(data: object): Promise<void> {
    try {
      const fileContent = JSON.stringify(data, null, 2);
      await fs.writeFile(this.fileName, fileContent, 'utf8');
    } catch (error) {
      console.log(error);
    }
  }
}