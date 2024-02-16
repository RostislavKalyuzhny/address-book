/**
 * Represents a contact with basic information.
 */
export interface IContact {
  /**
   * The unique identifier for the contact.
   */
  id: number;
  /**
   * The first name of the contact.
   */
  firstName: string;
  /**
   * The last name of the contact.
   */
  lastName: string;
  /**
   * The phone number of the contact.
   */
  phone: string;
  /**
   * The email address of the contact.
   */
  email: string;
}

/**
 * Represents the data transfer object (DTO) for creating a contact.
 */
export interface ContactDTO {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}



