import { Page } from "./page.abstract";

/**
 * Represents a page manager for navigating between pages.
 */
export interface IPageManager {
  /**
   * Changes the current page to the specified page.
   * @param {Page} page - The page to navigate to.
   */
  changePage(page: Page): void;

  /**
   * Navigates back to the previous page in the history.
   * If there are no pages in the history, logs an error message.
   * This method is intended for testing purposes.
   */
  navigateBack(): void;

  /**
   * Handles key presses for the current page.
   * @param {string} key - The key pressed by the user.
   */
  handleKeyPress(key: string): void;
}