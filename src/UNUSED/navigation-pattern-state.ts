
import readline from 'readline';
import { stdin as input, stdout as output } from 'node:process';

import { ContactService } from "./contact-service";
import { StorageManager } from "./Storage/storage-manager";
import { JSONStorage } from "./Storage/json-storage";

readline.emitKeypressEvents(input);

if (input.isTTY) {
  input.setRawMode(true);
}


const jsonStorage = new JSONStorage('./src/local-database/contacts.json');

const storageManager = new StorageManager(jsonStorage);

const contactService = new ContactService();

// Интерфейс Команды
interface Command {
  execute(): Promise<void>;
  //undo(): void;
}

interface PageController {
  changePage(page: Page): void;
  executeCommand(command: Command): Promise<any>;
  handleKeyPress(key: string): void;
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

interface KeyActions {
    [key: string]: () => void;
}
/**
 * Контекст определяет интерфейс, представляющий интерес для клиентов. Он также
 * хранит ссылку на экземпляр подкласса Состояния, который отображает текущее
 * состояние Контекста.
 */
class AddressBook implements PageController {
    /**
     * @type {Page} Ссылка на текущее состояние Контекста.
     */
    private currentPage!: Page;

    constructor(page: Page) {
        this.changePage(page);
    }

    /**
     * Контекст позволяет изменять объект Состояния во время выполнения.
     */
    public changePage(page: Page): void {
        //console.log(`Now you on ${(<any>page).constructor.name}.`);
        this.currentPage = page;
        this.currentPage.setContext(this);
    }

    public async executeCommand(command: Command): Promise<any> {
      console.log(await command.execute());
        //this.commandHistory.push(command);
    }
    /**
     * Контекст делегирует часть своего поведения текущему объекту Состояния.
     */
    public handleKeyPress(key: string): void {
        this.currentPage.handleKeyPress(key);
    }

}


abstract class Page {
    protected addressBook!: AddressBook;
    protected keyActions!: KeyActions;

    public setContext(addressBook: AddressBook) {
        this.addressBook = addressBook;
    }

    handleKeyPress(key: string): void {
        const action = this.keyActions[key] || this.keyActions.default;
        action();   
    }
}

/**
 * Конкретные Состояния реализуют различные модели поведения, связанные с
 * состоянием Контекста.
 */
class MenuA extends Page {
    keyActions: KeyActions = {
        '1': () => this.addressBook.changePage(new MenuB()),
        '2': () => this.addressBook.executeCommand(new GetAllUsersCommand(contactService, storageManager)),
        '3': () => console.log(3),
        default: () => console.log('Invalid key. Please try again.'),
    };
}

class MenuB extends Page {
    keyActions: KeyActions = {
        '1': () => console.log(1),
        '2': () => this.addressBook.changePage(new MenuA()),
        '3': () => console.log(3),
        '4': () => console.log(4),
        default: () => console.log('Invalid key. Please try again.'),
    };
}

/**
 * Клиентский код.
 */
const addressBook = new AddressBook(new MenuA());
console.log('start');

input.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        process.exit();
    } else {
        addressBook.handleKeyPress(key.name);
    }
});