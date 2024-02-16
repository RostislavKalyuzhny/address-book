
import { IPageManager } from "./page-manager.interface";
import { Page } from "./page.abstract";

export /**
 * Represents a manager for handling navigation between pages.
 */
class PageManager implements IPageManager {
  /**
   * The history of visited pages.
   */
  private history: Page[] = [];

  /**
   * The currently active page.
   */
  private currentPage: Page;

  /**
   * Creates a new instance of the PageManager class.
   * @param {Page} page - The initial page to set as the current page.
   */
  constructor(page: Page) {
    this.currentPage = page;
  }

  /**
   * Changes the current page to the specified page.
   * Adds the current page to the history before changing to the new page.
   * @param {Page} page - The page to navigate to.
   */
  public changePage(page: Page): void {
    this.history.push(this.currentPage);
    this.setPage(page);
  }

  /**
   * Sets the current page to the specified page.
   * @param {Page} page - The page to set as the current page.
   */
  private setPage(page: Page): void {
    this.currentPage = page;
  }

  /**
   * Navigates back to the previous page in the history.
   * If there are no pages in the history, logs an error message.
   */
  public navigateBack(): void {
    if (this.history.length < 1) {
      console.log('No pages to navigate back to.');
      return;
    }

    const previousPage = this.history.pop();

    if (previousPage) {
      this.setPage(previousPage);
      previousPage.renderContent();
    } else {
      console.log('Error: Unable to navigate back.');
    }
  }

  /**
   * Handles key presses for the current page.
   * If the current page is prompting for input, does nothing.
   * Otherwise, delegates key handling to the current page.
   * @param {string} key - The key pressed by the user.
   */
  public handleKeyPress(key: string): void {
    if (!this.currentPage.isPrompting()) {
      this.currentPage.keyHandler.setContext(this);
      this.currentPage.handleKeyPress(key);
    }
  }
}