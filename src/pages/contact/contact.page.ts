import { PageRender } from "../../Output/page-render";
import { Page } from "../../Page/page.abstract";
import { ContactPageKeyHandler } from "../../handlers/contact-page-key-handler";


export class ContactPage extends Page {
  contact: any;
  render: PageRender;

  constructor(contact: any) {
    super();
    this.contact = contact;
    this.render = new PageRender();
    this.keyHandler = new ContactPageKeyHandler();
    this.renderContent();
  }

  renderContent(): void {
    this.render.renderFullContact(this.contact);
    this.render.renderNavigatinBackInfo('b');
  }
}