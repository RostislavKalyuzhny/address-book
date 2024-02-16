import { PageManager } from "../Page/page-manager";
import { KeyActions } from "./key-actions.type";


export abstract class KeyHandler {
  keyActions!: KeyActions;
  pageManager!: PageManager;

  public setContext(pageManager: PageManager) {
    this.pageManager = pageManager; 
  }

  public handleKey(key: string): void {
    const action = this.keyActions[key] || this.keyActions.default;
    action(); 
  }
}