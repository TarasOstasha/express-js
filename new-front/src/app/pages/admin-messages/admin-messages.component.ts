import { Component, OnInit } from '@angular/core';
import appState from '../../app-state';
import { ApiService } from '../../services/api.service';
import { IContactMessages } from '../../interfaces/contact-messages';
declare var Array:any;
 
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
  allNotifications:any = {}; // all type of notifications in admin panel on the top level
  notificationAmount:number; // all messages from customer
  pagesAmount = 0; // length of pagination
  pagesAmountArray = [] // for rendering buttons of pagination

  constructor(
    private api: ApiService
  ) { 
    this.appState = appState; 
  }

  async ngOnInit() {
    //console.log(this.contactsForm);
    const fromServer:any = await this.api.getAdminMessages(this.currentPage);
    this.listMessages = fromServer.adminMessages;
    this.allNotifications = await this.api.getAdminNotifications();
    this.notificationAmount = this.allNotifications.notificationAmount;
    this.pagesAmount = Math.ceil(this.notificationAmount/this.sizePage); // get quantity of pages in pagination
    this.pagesAmountArray = [1,2,3]//[...Array(this.pagesAmount).keys()]; // generate buttons from pagination
    console.log('fromServer', fromServer)
  }


}

//how to transfer value from object in contacts component to admin-messages component????