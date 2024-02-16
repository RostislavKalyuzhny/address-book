import readline from 'readline';
import { stdin as input, stdout as output } from 'node:process';

readline.emitKeypressEvents(input);

input.write('\x1B[?25l'); // hide input cursor, hide permanently on terminal instance
input.setRawMode(true); // true - need for correct keypress handler, false - for using PromptService

import { PageManager } from './Page/page-manager';
import { StartPage } from './pages/start.page';

const pageManager = new PageManager(new StartPage());



input.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit(0);
  } else {
    pageManager.handleKeyPress(key.name);
  }
});
