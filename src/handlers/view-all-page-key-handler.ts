
import { KeyActions } from "../Handler/key-actions.type";
import { KeyHandler } from "../Handler/key-handler.abstact";
import { ContactPage } from "../pages/contact/contact.page";

// thinking about rework KeyHandler conception, like class constructor !!!

export class ViewAllPageKeyHandler extends KeyHandler {
  keyActions: any = {}; // problems with interface KeyActions

  constructor(contacts: any) {
    super();
    this.keyActions = this.createKeyActions(contacts);
  }

  private createKeyActions(contacts: any): KeyActions {
    const keyActions: any = {};

    contacts.forEach((contact: any, index: any) => {
      const key = index.toString();
      keyActions[key] = () => this.pageManager.changePage(new ContactPage(contact));
    });

    keyActions['b'] = () => this.pageManager.navigateBack();

    keyActions.default = () => console.log('Invalid key. Please try again.');

    return keyActions;
  }

  handleKey(key: string): void {
    const action = this.keyActions[key] || this.keyActions.default;
    action(); 
  }
}