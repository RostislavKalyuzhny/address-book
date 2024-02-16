import { Contact } from "./contact.model";
import { StorageManager } from "../Storage/storage-manager";
import { ContactService } from "./contact.service.interface";

export class StorageContactService implements ContactService {
  private storageManager: StorageManager;

  constructor(storageManager: StorageManager) {
    this.storageManager = storageManager;
  }

  async getAllContacts(): Promise<Contact[]> {
    const contacts = await this.storageManager.loadDataFromStorage();
    return contacts;
  }

  async searchContact(query: string): Promise<Contact[]> {
    const contacts = await this.storageManager.loadDataFromStorage();
    const queryInLowerCase = query.toLowerCase();
    return contacts.filter((contact: any) =>
      contact.firstName.toLowerCase() === queryInLowerCase ||
      contact.lastName.toLowerCase() === queryInLowerCase ||
      contact.phone === queryInLowerCase ||
      contact.email.toLowerCase() === queryInLowerCase
    );
  }

  async addContact(contact: Contact): Promise<void> {
    const contacts = await this.storageManager.loadDataFromStorage();
    contacts.push(contact);
    await this.storageManager.saveDataToStorage(contacts);
  }

  async updateContact(updatedContact: Contact): Promise<void> {
    const contacts = await this.storageManager.loadDataFromStorage();
    const index = contacts.findIndex((contact: any) => contact.id === updatedContact.id);
    if (index !== -1) {
      contacts[index] = updatedContact;
      await this.storageManager.saveDataToStorage(contacts);
    }
  }

  async deleteContact(id: number): Promise<void> {
    const contacts = await this.storageManager.loadDataFromStorage();
    const filteredContacts = contacts.filter((contact: any) => contact.id !== id);
    await this.storageManager.saveDataToStorage(filteredContacts);
  }
}