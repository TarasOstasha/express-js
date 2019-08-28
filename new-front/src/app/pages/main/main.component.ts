import { Component, OnInit } from '@angular/core';
//import { state } from '@angular/animations';
import { ApiService } from '../../services/api.service';
import { SessionService } from '../../services/session.service';
import  state  from '../../app-state';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  state: any;
  constructor(
    
    private api: ApiService,
    private session: SessionService,
    
  ) { 
    this.state = state;

   }

  async ngOnInit() {
    const  fromServer: any = await this.api.getProducts()
      state.products = fromServer.products;
      this.errorHandler 
   

    this.session.getUser()
      .then((dataFromLocalStorage: any) => {
        state.header.isLogged = true;
        state.header.user.name = dataFromLocalStorage.user.firstName || dataFromLocalStorage.user.username;
      })
      .catch( this.errorHandler )
  }

   errorHandler(err) {
    console.log(err);
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
