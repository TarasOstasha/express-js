import { Component, OnInit } from '@angular/core';
import appState from '../../app-state';
import { ApiService } from '../../services/api.service';
import { IContactMessages } from '../../interfaces/contact-messages';
import { toQueryString, getUrlQueries } from '../../my_models/stuff';

declare var Array: any;

@Component({
  selector: 'app-admin-messages-archive',
  templateUrl: './admin-messages-archive.component.html',
  styleUrls: ['./admin-messages-archive.component.less']
})
export class AdminMessagesArchiveComponent implements OnInit {
  appState: any;
  listMessages: Array<IContactMessages> = [];
  allNotifications: any = {}; // all type of notifications in admin panel on the top level
  //notificationAmount: number; // all messages from customer
  //pagination variables
  sizePage = 3; // quantity of product per page
  currentPage = 1; // current page in pagination
  pagesAmount = 0; // length of pagination
  pagesAmountArray = [] // for rendering buttons of pagination
  //search input
  searchString: string;


  constructor(
    private api: ApiService
  ) {
    this.appState = appState;
  }

  async ngOnInit() {
    this.getMessagesFromArchive();
    this.getNotifications();
  }

  clickPagination(btnIndex: number) {
    console.log('index', btnIndex);
    this.currentPage = btnIndex;
    this.getMessagesFromArchive();
  }
  async getNotifications() {
    this.allNotifications = await this.api.getAdminNotifications();
    //this.notificationAmount = this.allNotifications.notificationAmountArchive;
    this.recalcPagination(this.allNotifications.notificationAmountArchive);
  }

  async recalcPagination(notificationAmount) {
    this.pagesAmount = Math.ceil(notificationAmount / this.sizePage); // get quantity of pages in pagination
    this.pagesAmountArray = Array.from(Array(this.pagesAmount).keys()) // generate buttons from pagination
    this.pagesAmountArray.shift(); // remove first element (0) to start pagination from number 1
    this.pagesAmountArray.push(this.pagesAmount); // add last page to array
    console.log('pagesAmountArray', this.pagesAmountArray)
  }

  async getMessagesFromArchive() {
    this.getNotifications();
    //const fromServer: any = await this.api.getAdminMessagesFromArchive(this.currentPage, this.sizePage); //get all messages from server

    const fromServer: any = await this.api.getAdminMessagesFromArchive(this.currentPage, this.sizePage);
    this.listMessages = fromServer.adminMessageFromArchive; //set to list messages data from object adminMessageFromArchive
    console.log('getAdminMessagesArchive', fromServer, this.listMessages)
  }

  async search() {
    const queryString = toQueryString({
      query: this.searchString,
      fromModel: 'ContactMessageArchive',
      fields: ['name', 'email', 'subject', 'message'],
      size: this.sizePage
    });
    const fromServer: any = await this.api.getUniversalSearch(this.currentPage, queryString);
    this.listMessages = fromServer.documents;
    this.recalcPagination(fromServer.amount);
    console.log('fromServer', fromServer)
  }
}
