import { Component } from '@angular/core';
import { FingerprintService } from '../services/fingerprint.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'new-front';
  appState: any = {}
  constructor(private fingerPrint: FingerprintService) {}

  ngOnInit(){
    this.fingerPrint.checkIfItExist()
  }


}

