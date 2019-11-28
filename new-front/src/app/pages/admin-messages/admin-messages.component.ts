import { Component, OnInit } from '@angular/core';
import appState from '../../app-state';
import { ApiService } from '../../services/api.service';
import { IContactMessages } from '../../interfaces/contact-messages';
 
@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.less']
})
export class AdminMessagesComponent implements OnInit {
  appState: any;
  listMessages: Array<IContactMessages> = [];
  

  constructor(
    private api: ApiService
  ) { 
    this.appState = appState; 
  }

  async ngOnInit() {
    //console.log(this.contactsForm);
    const fromServer:any = await this.api.getAdminMessages();
    this.listMessages = fromServer.adminMessages;
    
    console.log('fromServer', fromServer)
  }


}

//how to transfer value from object in contacts component to admin-messages component????