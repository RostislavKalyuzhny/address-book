/**
 * Represents a page in a user interface.
 */
export interface IPage {
  /**
   * Determines if the page is currently prompting for user input.
   * @returns {boolean} True if the page is prompting, otherwise false.
   */
  isPrompting(): boolean;

  /**
   * Enables prompting for user input on the page.
   */
  enablePrompting(): void;

  /**
   * Disables prompting for user input on the page.
   */
  disablePrompting(): void;

  /**
   * Handles a key press event on the page.
   * @param {string} key - The key pressed by the user.
   */
  handleKeyPress(key: string): void;

  /**
   * Renders the content of the page.
   * This method should be implemented by subclasses.
   */
  renderContent(): void;
}
