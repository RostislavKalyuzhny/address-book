import { PageRender } from "../Output/page-render";
import { Page } from "../Page/page.abstract";
import { StartPageKeyHandler } from "../handlers/start-page-key-handler";



export class StartPage extends Page {
  render: PageRender;

  constructor() {
    super();
    this.keyHandler = new StartPageKeyHandler();
    this.render = new PageRender();
    this.renderContent();
  }

  renderContent(): void {
    this.render.renderPageHeader('Start Page');
    console.log('1.FindContactPage');
    console.log('2.WiewAllPage');
  }
}