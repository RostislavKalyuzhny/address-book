import { StorageContactService } from "../Contact/contact.service";

import { StorageManager } from "../Storage/storage-manager";
import { JSONStorage } from "../Storage/json-storage";
import { ViewAllPage } from "../pages/view-all.page";
import { FindContactPage } from "../pages/find-contact.page";
import { KeyHandler } from "../Handler/key-handler.abstact";
import { KeyActions } from "../Handler/key-actions.type";


const jsonStorage = new JSONStorage('./src/local-database/contacts.json'); 
const storageManager = new StorageManager(jsonStorage); 

export class StartPageKeyHandler extends KeyHandler {
  keyActions: KeyActions = {
    '1': () => this.pageManager.changePage(new FindContactPage(new StorageContactService(storageManager))), // new FindContactPage...?
    '2': () => this.pageManager.changePage(new ViewAllPage(new StorageContactService(storageManager))),
    default: () => console.log('Invalid key. Please try again.'),
  };

  handleKey(key: string): void {
    const action = this.keyActions[key] || this.keyActions.default;
    action(); 
  }
}

