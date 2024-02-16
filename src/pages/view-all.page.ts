
import { Contact } from "../Contact/contact.model";
import { ContactService } from "../Contact/contact.service.interface";
import { PageRender } from "../Output/page-render";
import { Page } from "../Page/page.abstract";
import { Pagination } from "../Pagination/Pagination";
import { ViewAllPageKeyHandler } from "../handlers/view-all-page-key-handler";


export class ViewAllPage extends Page {
  private contactService: ContactService;  
  private pagination!: Pagination<Contact>;
  private render!: PageRender;
  //keyHandler!: KeyHandler;

  private contacts!: Contact[] | undefined; 

  constructor(contactService: ContactService) {
    super();
    this.contactService = contactService;
    this.render = new PageRender();
    this.init();
  }

  private async init() {
    this.contacts = await this.contactService.getAllContacts();

    if (this.contacts){
      this.pagination = new Pagination<Contact>(this.contacts, 10);
    } else {
      console.log('Contacts not fined'); 
    }

    this.keyHandler = new ViewAllPageKeyHandler(this.pagination.getVisibleItems()); // !!! problem with async code !!!
    this.renderContent(); 
  }

  renderContent(): void {
    this.render.renderPageHeader('WiewAllPage');
    this.render.renderShortContactsList(this.pagination.getVisibleItems());
    this.render.renderPaginationInfo(this.pagination);
    this.render.renderNavigatinBackInfo('b');
  }

}