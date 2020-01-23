import { Component } from '@angular/core';
import { FingerprintService } from '../services/fingerprint.service'
import { ApiService } from '../services/api.service';
import appState from '../app-state';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  title = 'new-front';
  appState: any;
  constructor(private fingerPrint: FingerprintService, private api: ApiService) {
    this.appState = appState;
  }

  ngOnInit(){
    this.fingerPrint.checkIfItExist();
    this.getUserInfo();
  }

  async getUserInfo() {
    const fromServer: any = await this.api.getUserInfoIfLogged();
    console.log('result getUserInfo', fromServer);
    if (fromServer) {
      this.appState.header.isLogged = true;
      this.appState.header.user.name = fromServer.firstName;
    }
  }

}

