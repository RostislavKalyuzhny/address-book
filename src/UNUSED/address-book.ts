/*import { Contact } from "./Contact/contact.model";
import { DataManager } from "./Storage/data-manager";
import { JSONStorage } from "./Storage/json-storage";
import { YAMLStorage } from "./Storage/yaml-storage";


const jsonStorage = new JSONStorage('./src/local-database/contacts.json');
const yamlStorage = new YAMLStorage('./src/local-database/contacts.yaml');

const dataManager = new DataManager(yamlStorage);

dataManager.create(new Contact('John2', 'Peter', '123-456-7890', 'john@example.com')).then((contact) => {
  console.log('Created:', contact);
})*/

import readline from 'readline';
import { stdin as input, stdout as output } from 'node:process';

readline.emitKeypressEvents(input);

if (input.isTTY) {
  input.setRawMode(true);
}


interface KeyActions {
    [key: string]: () => void;
}
/**
 * Контекст определяет интерфейс, представляющий интерес для клиентов. Он также
 * хранит ссылку на экземпляр подкласса Состояния, который отображает текущее
 * состояние Контекста.
 */
class AddressBook {
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
      '2': () => console.log(2),
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

input.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        process.exit();
    } else {
        addressBook.handleKeyPress(key.name);
    }
});


