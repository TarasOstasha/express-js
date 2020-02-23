import { Component, OnInit } from '@angular/core';
//import { state } from '@angular/animations';
import { ApiService } from '../../services/api.service';
import state from '../../app-state';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  state: any; //remove
  appState: any;
  constructor(

    private api: ApiService,

  ) {
    this.state = state;
    this.appState = state;
  }

  async ngOnInit() {
    // setTimeout(()=> alert('Hi Guys, Thank you for visit us.\n Our web site is on develop \n If you have any question write us on tonyjoss1990@gmail.com'), 1000)

  }

  cardHandler(product) {
    console.log('return data', product);
    state.header.basket.products.push(product); //додати продукт в корзину
    this.refreshBasketStorage()
    //  this.header_state.basket = this.state.basket; // передати 
  }

  refreshBasketStorage() {
    const json = JSON.stringify(state.header.basket.products);
    localStorage.setItem('basket', json);
  }



  headerHandler(headerState) {
    state.header = headerState;
  }



  register(form) {
    console.log(form)
  }

}
