import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { BaseStorageStrategy } from './Storage-deprecated/base-storage-strategy';

const rl = readline.createInterface({ input, output });


export class ContactController {
  private storage: BaseStorageStrategy;

  constructor(storage: BaseStorageStrategy) {
    this.storage = storage;
  }

  async showMenu(): Promise<void> {
    console.log('1. Find contact');
    console.log('2. View All');
    console.log('3. Add contact');

    const choice = await rl.question('Enter your choice: ');

    switch (choice) {
      case '1':
        await this.findContact();
        break;
      case '2':
        await this.viewAllContacts();
        break;
      case '3':
        await this.addContact();
        break;
      default:
        console.log('Invalid choice. Please try again.');
        break;
    }
  }

  private async findContact(): Promise<void> {
    const id = parseInt(await rl.question('Enter contact ID: '), 10);
    const contact = await this.storage.read(id);

    if (contact) {
      console.log('Contact found:', contact);
    } else {
      console.log('Contact not found.');
    }
  }

  private async viewAllContacts(): Promise<void> {
    const contacts = {}
    console.log('All contacts:', contacts);
  }

  private async addContact(): Promise<void> {
    const firstName = await rl.question('Enter first name: ');
    const lastName = await rl.question('Enter last name: ');
    const phone = await rl.question('Enter phone number: ');
    const email = await rl.question('Enter email: ');

    const newContact = await this.storage.create({ firstName, lastName, phone, email });
    console.log('Contact added:', newContact);
  }
}
