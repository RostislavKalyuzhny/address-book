
import util from 'util';


const successfullMessage = (message: string) => {
  console.log(util.format('\x1b[32m%s\x1b[0m', message)); // \x1b[32m - green color tex
}

const errorMessage = (message: string) => {
  console.log(util.format('\x1b[31m%s\x1b[0m', message)); // \x1b[31m - red color text
}


const data = [{ Имя: 'John', Возраст: 25 }, { Имя: 'Jane', Возраст: 22 }];
console.table(data);

//successfullMessage('Done!');
/*
{
  const total = 10;
  let current = 0;

  const progressBar = (current: number) => {
    const percentage = (current / total) * 100;
    process.stdout.clearLine(1);
    process.stdout.cursorTo(0);
    process.stdout.write(`Loading - ${percentage.toFixed(2)}%`);
  };

  const timer = setInterval(() => {
    progressBar(++current);
    if (current === total) {
      clearInterval(timer);
      console.log('\n');
    }
  }, 500);
}

*/
class Loading {
  private loadingInterval: NodeJS.Timeout | null = null;
  private loadingText: string = 'Loading';
  private loadingPoints: string = '';

  startLoading(): void {
    process.stdout.write(`\n${this.loadingText}`);

    this.loadingInterval = setInterval(() => {
      if(this.loadingPoints.length == 3){
        this.loadingPoints = '';
      } else {
        this.loadingPoints += '.';
        process.stdout.write(`${this.loadingPoints}`);
      }
    }, 200);
  }

  stopLoading(): void {
    if (this.loadingInterval) {
      clearInterval(this.loadingInterval);
      this.loadingInterval = null;
      process.stdout.clearLine(1); 
      process.stdout.cursorTo(0); 
    }
  }

  async runWithLoader<T>(asyncFunction: () => Promise<T>): Promise<T> {
    try {
      this.startLoading();
      return await asyncFunction();
    } finally {
      this.stopLoading();
    }
  }
}

const loader = new Loading();

const asyncFunction = async () => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log("Async operation completed!");
  return "Result of async operation";
};

loader.runWithLoader(asyncFunction)
  .then(result => console.log(`Result: ${result}`))
  .catch(error => console.error(`Error: ${error}`));
