import { stdin as input, stdout as output } from 'node:process';
import { KeyActions } from '../Handler/key-actions.type';
//import { KeyHandler } from "../Page/key-handler";


class StartPageKeyHandler  {  // extends KeyHandler
  simpleKeyActions: KeyActions = {
    '1': () => console.log(1),
    '2': () => console.log(2),
    '3': () => console.log(3),
    //'ctrl+b': () => console.log('pressed ctrl+b'), // create key 'ctrl+b' in 
    //'shift+b': () => console.log('pressed ctrl+b'),
    default: () => console.log('Invalid key. Please try again.'), // create new variable for default?
  };

  ctrlKeyActions: KeyActions = {  // dont use ctrl + h i j m c - modefied property name ;
    'b': () => console.log('pressed ctrl+b'),
    default: () => console.log('Invalid key. Please try again.'),
  }

  shiftKeyActions: KeyActions = { 
    'b': () => console.log('pressed shift+b'),
    default: () => console.log('Invalid key. Please try again.'),
  }

  handleKey({ ctrl, name }: { ctrl: boolean, name: string }) {
    let action: () => void;

    if(!ctrl){
      action = this.simpleKeyActions[name] || this.simpleKeyActions.default;
    } else {
      action = this.ctrlKeyActions[name] || this.ctrlKeyActions.default;
    }

    action(); 
  }
}

const startPageKeyHandler = new StartPageKeyHandler();

input.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit(0);
  } else {
    startPageKeyHandler.handleKey(key);
  }
});
