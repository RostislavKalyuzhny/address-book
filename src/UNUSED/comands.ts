import { ContactService } from "../Contact/contact.service.interface";
import { JSONStorage } from "../Storage/json-storage";
import { YAMLStorage } from "../Storage/yaml-storage";


const jsonStorage = new JSONStorage('./src/local-database/contacts.json');
const yamlStorage = new YAMLStorage('./src/local-database/contacts.yaml');


const contactService = new ContactService();

// Интерфейс Команды
interface Command {
  execute(): Promise<void>;
  //undo(): void;
}

class GetAllUsersCommand implements Command {
    private contactService: ContactService;
    private storage: StorageManager;
    

    constructor(contactService: ContactService, storage: StorageManager) {
      this.contactService = contactService;
      this.storage = storage;
    }

    async execute(): Promise<any> {
      const contacts = await this.storage.loadDataFromStorage();
      this.contactService.setContacts(contacts);
      return this.contactService.getAllContacts();
    }
}

class AdressBook {
    //private commandHistory: Command[] = [];
    private contactService: ContactService;
    private storageManager: StorageManager;

    constructor(contactService: ContactService, storageManager: StorageManager) {
      this.contactService = contactService;
      this.storageManager = storageManager;
    }

    async executeCommand(): Promise<any> {
      const getAllUsersCommand = new GetAllUsersCommand(this.contactService, this.storageManager);
      console.log(await getAllUsersCommand.execute());
        //this.commandHistory.push(command);
    }

    /*undoLastCommand(): void {
        if (this.commandHistory.length > 0) {
            const lastCommand = this.commandHistory.pop();
            lastCommand.undo();
        } 
    }*/
}

const adressBook = new AdressBook(contactService, storageManager);

adressBook.executeCommand();
  //.then(console.log);