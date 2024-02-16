/**
 * Represents a pagination utility for managing paginated lists of items.
 * @typeparam T The type of items in the pagination.
 */
export interface IPagination<T> {
  /**
   * Sets the current page to the specified page number.
   * If the specified page number is less than 1, sets the current page to 1.
   * If the specified page number is greater than the total number of pages, sets the current page to the last page.
   * @param {number} page - The page number to set.
   */
  setPage(page: number): void;

  /**
   * Gets the current page number.
   * @returns {number} The current page number.
   */
  getCurrentPage(): number;

  /**
   * Gets the total number of pages based on the total number of items and page size.
   * @returns {number} The total number of pages.
   */
  getTotalPages(): number;

  /**
   * Gets the visible items for the current page.
   * @returns {T[]} An array of items visible on the current page.
   */
  getVisibleItems(): T[];

  /**
   * Moves to the next page if available.
   */
  nextPage(): void;

  /**
   * Moves to the previous page if available.
   */
  prevPage(): void;
}
