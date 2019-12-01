import { Component, OnInit } from '@angular/core';
import appState from '../../app-state';
import { ApiService } from '../../services/api.service';
import { IContactMessages } from '../../interfaces/contact-messages';
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
  notificationAmount: number; // all messages from customer
  //pagination variables
  sizePage = 3; // quantity of product per page
  currentPage = 1; // current page in pagination
  pagesAmount = 0; // length of pagination
  pagesAmountArray = [] // for rendering buttons of pagination
  
  
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
    this.notificationAmount = this.allNotifications.notificationAmountArchive;
    this.pagesAmount = Math.ceil(this.notificationAmount / this.sizePage); // get quantity of pages in pagination
    this.pagesAmountArray = Array.from(Array(this.pagesAmount).keys()) // generate buttons from pagination
    //console.log('pagesAmountArray', this.pagesAmountArray)
  }

  async getMessagesFromArchive() {
    this.getNotifications();
    //const fromServer: any = await this.api.getAdminMessagesFromArchive(this.currentPage, this.sizePage); //get all messages from server
    
    const fromServer: any = await this.api.getAdminMessagesFromArchive(this.currentPage, this.sizePage);
    this.listMessages = fromServer.adminMessageFromArchive; //set to list messages data from object adminMessageFromArchive
    console.log('getAdminMessagesArchive',fromServer, this.listMessages)
  }
}
