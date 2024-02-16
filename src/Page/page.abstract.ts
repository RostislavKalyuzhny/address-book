import { stdin as input, stdout as output } from 'node:process';
import { KeyHandler } from '../Handler/key-handler.abstact';
import { IPage } from './page.interface';

//import { PageManager } from "./page-manager";

  /**
    * Represents an abstract base class for pages in a user interface.
  */
export abstract class Page implements IPage {
  /**
   * The key handler for the page.
   */
  public keyHandler!: KeyHandler;

  /**
   * Flag indicating whether the page is currently prompting for user input.
   */
  private prompting: boolean = false;

  /**
   * Determines if the page is currently prompting for user input.
   * @returns {boolean} True if the page is prompting, otherwise false.
   */
  public isPrompting(): boolean {
    return this.prompting;
  }

  /**
   * Enables prompting for user input on the page.
   */
  public enablePrompting(): void {
    this.prompting = true;
    input.write('\x1B[?25h'); // unhide cursor
    input.setRawMode(false);
  }

  /**
   * Disables prompting for user input on the page.
   */
  public disablePrompting(): void {
    this.prompting = false;
    input.write('\x1B[?25l'); // hide cursor
    input.setRawMode(true);
  }

  /**
   * Handles a key press event on the page.
   * Delegates key handling to the page's key handler.
   * @param {string} key - The key pressed by the user.
   */
  public handleKeyPress(key: string): void {
    this.keyHandler.handleKey(key);
  }

  /**
   * Renders the content of the page.
   * This method should be implemented by subclasses.
   */
  abstract renderContent(): void;
}
