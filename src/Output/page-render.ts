const util = require('util');

// separate other renders and contact render?

export class PageRender {
  renderShortContactsList(contacts: any[]) {
    contacts.forEach((contact: any, index: number) => {
      console.log(`${index}. ${contact.firstName} ${contact.lastName}`);
    });
  }

  renderFullContact(contact: any) {
    console.table(`\n ${contact.id}\n ${contact.firstName}\n ${contact.lastName}\n ${contact.email}\n ${contact.phone}`);
  }

  renderPaginationInfo(pagination: any) {
    console.log(`Pages: ${pagination.getCurrentPage()}/${pagination.getTotalPages()}`);
  }

  renderPageHeader(name: string) {
    const formattedText = util.format('\n\t\x1b[1m\x1b[31m%s\x1b[0m', name);
    console.log(formattedText);
  }

  renderNavigatinBackInfo(key: string){
    const greenKey = util.format('\x1b[32m%s\x1b[0m', key)
    console.log(`Press ${greenKey} for navigate back`);
  }
}