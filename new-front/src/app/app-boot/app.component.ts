import { Component, ChangeDetectorRef } from '@angular/core';
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
    private cdr: ChangeDetectorRef,
    private storage: StorageService) {
  }

  async ngOnInit() {

    console.log(this.appState)
    try {
      this.fingerPrint.checkIfItExist();
      this.setUserInfo();
      this.appState.header.basket.products = await this.storage.getBasketFromStorage();
      const fromServer: any = await this.api.getProducts()
      appState.products = fromServer.products;
    } catch (error) {
      console.log(error);
    }
  }

  async setUserInfo() {
    const user: any = await this.session.getUser();
    console.log(user, '---dataFromLocalStorage')
    if (user.firstName || user.userName) {
      this.appState.header.isLogged = true;
      appState.header.user.role = user.role;
      appState.header.user.name = user.firstName || user.userName;
      //this.cdr.detectChanges(); // force rebinding
    }
    console.log(appState)
  }


}

