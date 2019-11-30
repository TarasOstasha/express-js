import { Component, OnInit } from '@angular/core';
import appState from '../../app-state';
import { ApiService } from '../../services/api.service';
import { IContactMessages } from '../../interfaces/contact-messages';
declare var Array: any;

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.less']
})
export class AdminMessagesComponent implements OnInit {
  appState: any;
  listMessages: Array<IContactMessages> = [];
  sizePage = 3; // quantity of product per page
  currentPage = 1; // current page in pagination
  allNotifications: any = {}; // all type of notifications in admin panel on the top level
  notificationAmount: number; // all messages from customer
  pagesAmount = 0; // length of pagination
  pagesAmountArray = [] // for rendering buttons of pagination
  //selectedIndex: number = 1; // index pagination number

  constructor(
    private api: ApiService
  ) {
    this.appState = appState;
  }

  async ngOnInit() {
    //console.log(this.contactsForm);
    this.getMessages();
    this.getNotifications();
   
  }

  async getMessages() {
    const fromServer: any = await this.api.getAdminMessages(this.currentPage, this.sizePage);
    this.listMessages = fromServer.adminMessages;
    console.log('fromServer', fromServer);

  }
  clickPagination(btnIndex: number) {
    console.log('index', btnIndex);
    this.currentPage = btnIndex;
    this.getMessages();
    console.log('currentPage-', this.currentPage)
  }
  async getNotifications() {
    this.allNotifications = await this.api.getAdminNotifications();
    this.notificationAmount = this.allNotifications.notificationAmount;
    this.pagesAmount = Math.ceil(this.notificationAmount / this.sizePage); // get quantity of pages in pagination
    this.pagesAmountArray = Array.from(Array(this.pagesAmount).keys()) // generate buttons from pagination
    console.log('currentPageNgOnInit', this.currentPage);
    console.log('pagesAmountArray', this.pagesAmountArray)
  }

  async moveToArchive(id) {
    const fromServer: any = await this.api.moveToArchiveAdminMessages(id);
    this.getNotifications();
  }
}
