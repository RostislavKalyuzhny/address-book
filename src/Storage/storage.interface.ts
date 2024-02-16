
/**
 * Interface representing a storage mechanism for loading and saving data.
 */
export interface IStorage {
  /**
   * Loads data from storage.
   * @returns {Promise<any>} A Promise that resolves to the loaded data.
   */
  load(): Promise<any>;

  /**
   * Saves data to storage.
   * @param {object} data - The data to save.
   * @returns {Promise<void>} A Promise that resolves when the data is successfully saved.
   */
  save(data: object): Promise<void>;
}