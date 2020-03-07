import { Component } from '@angular/core';
import { FingerprintService } from '../services/fingerprint.service'
import { ApiService } from '../services/api.service';
import appState from '../app-state';
import { SessionService } from '../services/session.service';
import { StorageService } from '../services/storage.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  title = 'new-front';
  appState: any = appState;
  constructor(
    private fingerPrint: FingerprintService, 
    private api: ApiService, private session: SessionService,
    private storage: StorageService) {
  }

  async ngOnInit(){
    
    console.log(this.appState)
    try {
      this.fingerPrint.checkIfItExist();
      this.getUserInfo();
      this.appState.header.basket.products = this.storage.getBasketFromStorage();
      const fromServer: any = await this.api.getProducts()
      appState.products = fromServer.products;
      const user: any = await this.session.getUser();
      console.log(user, '---dataFromLocalStorage')
      appState.header.user.role = user.role;
      appState.header.user.name = user.firstName || user.username;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserInfo() {
    const fromServer: any = await this.api.getUserInfoIfLogged();
    console.log('result getUserInfo', fromServer);
    if (fromServer.firstName || fromServer.userName) {
      this.appState.header.isLogged = true;
      console.log('isLogged - ', this.appState.header.isLogged)
      this.appState.header.user.name = fromServer.firstName 

    }
  }


}

