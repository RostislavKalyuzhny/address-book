import { IPagination } from "./pagination.interface";

/**
 * Represents a utility for paginating lists of items.
 * @typeparam T The type of items in the pagination.
 */
export class Pagination<T> implements IPagination<T> {
  /**
   * The list of items to paginate.
   */
  private items: T[];

  /**
   * The number of items per page.
   */
  private pageSize: number;

  /**
   * The current page number.
   */
  private currentPage: number;

  /**
   * Creates a new instance of the Pagination class.
   * @param {T[]} items - The list of items to paginate.
   * @param {number} pageSize - The number of items per page.
   */
  constructor(items: T[], pageSize: number) {
    this.items = items;
    this.pageSize = pageSize;
    this.currentPage = 1;
  }

  /**
   * Sets the current page to the specified page number.
   * If the specified page number is less than 1, sets the current page to 1.
   * If the specified page number is greater than the total number of pages, sets the current page to the last page.
   * @param {number} page - The page number to set.
   */
  public setPage(page: number): void {
    if (page < 1) {
      this.currentPage = 1;
    } else if (page > this.getTotalPages()) {
      this.currentPage = this.getTotalPages();
    } else {
      this.currentPage = page;
    }
  }

  /**
   * Gets the current page number.
   * @returns {number} The current page number.
   */
  public getCurrentPage(): number {
    return this.currentPage;
  }

  /**
   * Gets the total number of pages based on the total number of items and page size.
   * @returns {number} The total number of pages.
   */
  public getTotalPages(): number {
    return Math.ceil(this.items.length / this.pageSize);
  }

  /**
   * Gets the visible items for the current page.
   * @returns {T[]} An array of items visible on the current page.
   */
  public getVisibleItems(): T[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.items.slice(startIndex, endIndex);
  }

  /**
   * Moves to the next page if available.
   */
  public nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  /**
   * Moves to the previous page if available.
   */
  public prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
