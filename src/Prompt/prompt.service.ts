import { stdin as input, stdout as output } from 'node:process';

/**
	* Service for asking questions to the user and getting answers.
*/

export class PromptService {

	/**
	   * Asks a question to the user and returns the answer as a Promise.
	   * @param {string} question - The question to ask the user.
	   * @returns {Promise<string>} A Promise resolving to the user's answer as a string.
   	*/
	public askQuestion(question: string) : Promise<string> {
	  return new Promise((resolve) => {
	    output.write(question + ' ');

	    input.once('data', (data) => {
	      resolve(data.toString().trim());
	    });
	  });
	}
}