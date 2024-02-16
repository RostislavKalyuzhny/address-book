
import { Page } from "../Page/page.abstract";
import { PromptService } from '../Prompt/prompt.service';

import { PageRender } from "../Output/page-render";
import { Pagination } from "../Pagination/Pagination";
import { FindContactPageKeyHandler } from "../handlers/find-contact-page-key-handler";
import { ContactService } from "../Contact/contact.service.interface";
import { Contact } from "../Contact/contact.model";


export class FindContactPage extends Page {
  private contactService: ContactService;
  private render: PageRender;
  private contacts!: Contact[] | undefined;
  private userInput!: string;
  private pagination!: Pagination<any>;

  constructor(contactService: ContactService) {
    super();
    this.contactService = contactService;
    this.render = new PageRender();
    this.init();
  }

  private async init() {
    await this.promptUser('Enter query: ');
    this.contacts = await this.contactService.searchContact(this.userInput);

    if (this.contacts){
      this.pagination = new Pagination<Contact>(this.contacts, 10);
    } else {
      console.log('Contacts not fined'); 
    }

    this.keyHandler = new FindContactPageKeyHandler(this.pagination.getVisibleItems()); // ! sometime problem with async code !
    this.renderContent(); 
  }

  private async promptUser(question: string) {
    super.enablePrompting();
    this.userInput = await new PromptService().askQuestion(question);
    super.disablePrompting();
  }

  renderContent(): void {
    this.render.renderPageHeader('Find Contact Page');
    this.render.renderShortContactsList(this.pagination.getVisibleItems());  
    this.render.renderPaginationInfo(this.pagination);  // maybe somehow synchronize KeyHandler with PageRender
    this.render.renderNavigatinBackInfo('b');
  }

}