import fs from 'fs/promises';
import yaml from 'yaml';
import { IStorage } from './storage.interface';

/**
 * Class representing a storage mechanism using YAML format.
 * Implements the `IStorage` interface.
 */
export class YAMLStorage implements IStorage {
  fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  /**
   * Loads data from storage in YAML format.
   * @returns {Promise<any>} A Promise that resolves to the loaded data.
   */
  async load(): Promise<any> {
    try {
      const fileContent = await fs.readFile(this.fileName, 'utf8');
      return yaml.parse(fileContent) || [];
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Saves data to storage in YAML format.
   * @param {object} data - The data to save.
   * @returns {Promise<void>} A Promise that resolves when the data is successfully saved.
   */
  async save(data: object): Promise<void> {
    try {
      const fileContent = yaml.stringify(data);
      await fs.writeFile(this.fileName, fileContent, 'utf8');
    } catch (error) {
      console.log(error);
    }
  }
}