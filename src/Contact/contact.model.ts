
import { IContact } from './contact.interface';

/**
 * Represents a contact with detailed information.
 * Implements the `IContact` interface.
 */
export class Contact implements IContact {
  /**
   * The unique identifier for the contact.
   */
  id: number;

  /**
   * Creates a new instance of the `Contact` class.
   * @param {string} firstName - The first name of the contact.
   * @param {string} lastName - The last name of the contact.
   * @param {string} phone - The phone number of the contact.
   * @param {string} email - The email address of the contact.
   */
  constructor(
    public firstName: string,
    public lastName: string,
    public phone: string,
    public email: string
  ) {
    this.id = this.generateId();
  }

  /**
   * Generates a unique identifier for the contact based on the current timestamp and a random number.
   * @returns {number} The generated unique identifier.
   */
  private generateId(): number {
    return Date.now() + Math.floor(Math.random() * 10000) + 1;
  }
}