import { Contact } from "./contact.model"

/**
 * Represents a service for managing contacts.
 */
export interface ContactService {
  /**
   * Retrieves all contacts.
   * @returns {Promise<Contact[]>} A Promise that resolves to an array of contacts.
   */
  getAllContacts(): Promise<Contact[]>;
  
  /**
   * Searches for contacts based on a query.
   * @param {string} query - The search query.
   * @returns {Promise<Contact[] | undefined>} A Promise that resolves to an array of matching contacts, or `undefined` if no matches are found.
   */
  searchContact(query: string): Promise<Contact[] | undefined>;
  
  /**
   * Adds a new contact.
   * @param {Contact} contact - The contact to add.
   * @returns {Promise<void>} A Promise that resolves when the contact is successfully added.
   */
  addContact(contact: Contact): Promise<void>;
  
  /**
   * Updates an existing contact.
   * @param {Contact} updatedContact - The updated contact information.
   * @returns {Promise<void>} A Promise that resolves when the contact is successfully updated.
   */
  updateContact(updatedContact: Contact): Promise<void>;
  
  /**
   * Deletes a contact by its unique identifier.
   * @param {number} id - The unique identifier of the contact to delete.
   * @returns {Promise<void>} A Promise that resolves when the contact is successfully deleted.
   */
  deleteContact(id: number): Promise<void>;
}