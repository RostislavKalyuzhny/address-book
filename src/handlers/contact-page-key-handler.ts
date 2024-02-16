import { KeyActions } from "../Handler/key-actions.type";
import { KeyHandler } from "../Handler/key-handler.abstact";


export class ContactPageKeyHandler extends KeyHandler {
  keyActions: KeyActions = {
    'b': () => this.pageManager.navigateBack(),
    '4': () => console.log(4),
    default: () => console.log('Invalid key. Please try again.'),
  };

}