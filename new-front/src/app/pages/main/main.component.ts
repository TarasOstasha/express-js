import { Component, OnInit } from '@angular/core';
import { state } from '@angular/animations';
import { ApiService } from '../../services/api.service';
import { SessionService } from '../../services/session.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  

  constructor(
    
    private api: ApiService,
    private session: SessionService,
    
  ) {  }

  // public state: any;

  // cards = [
  //   {
  //     title: 'product',
  //     id: 1,
  //     img: 'assets/img/sws1.png',
  //     imgSport: 'assets/img/nike_Logo_White.png',
  //     fashionLine: 'FAS',
  //     model: 'Hartbee',
  //     modelType: 'sport',
  //     collection: 'Basket Ball Collection',
  //     size: 'size',
  //     typeOfSize: [7, 8, 9, 10, 11],
  //     selectedSize: 8,
  //     color: 'color',
  //     colorProducts: ['orange', 'green', 'yellow'],
  //     selectedColor: 'orange',
  //     text: 'description',
  //     price: 1,
  //     stars: {
  //       public: 50,
  //       privite: 35.5
  //     }
  //   },
  //   {
  //     title: 'product',
  //     id: 2,
  //     img: 'assets/img/sws1.png',
  //     imgSport: 'assets/img/nike_Logo_White.png',
  //     fashionLine: 'FAS',
  //     model: 'Hartbee',
  //     modelType: 'sport',
  //     collection: 'Basket Ball Collection',
  //     size: 'size',
  //     typeOfSize: [7, 8, 9, 10, 11],
  //     selectedSize: 8,
  //     color: 'color',
  //     colorProducts: ['orange', 'green', 'yellow'],
  //     selectedColor: 'orange',
  //     text: 'description',
  //     price: 2,
  //     stars: {
  //       public: 60,
  //       privite: 75.5
  //     }
  //   },
  //   {
  //     title: 'product',
  //     id: 3,
  //     img: 'assets/img/sws1.png',
  //     imgSport: 'assets/img/nike_Logo_White.png',
  //     fashionLine: 'FAS',
  //     model: 'Hartbee',
  //     modelType: 'sport',
  //     collection: 'Basket Ball Collection',
  //     size: 'size',
  //     typeOfSize: [7, 8, 9, 10, 11],
  //     selectedSize: 8,
  //     color: 'color',
  //     colorProducts: ['orange', 'green', 'yellow'],
  //     selectedColor: 'orange',
  //     text: 'description',
  //     price: 3,
  //     stars: {
  //       public: 20,
  //       privite: 99.5
  //     }
  //   }
  // ];

  state = {
    header: {
      isLogged: false,
      user: {
        name: ''
      },
      basket: {
        open: false,
        products: [],
        defaultData : {
          states: []
        },
        paymentData :{}
      },
      searchResult: []
    },
    products: [],
  }

  async ngOnInit() {
    const  fromServer: any = await this.api.getProducts()
      this.state.products = fromServer.products;
      this.errorHandler 
   

    this.session.getUser()
      .then((dataFromLocalStorage: any) => {
        this.state.header.isLogged = true;
        this.state.header.user.name = dataFromLocalStorage.user.firstName || dataFromLocalStorage.user.username;
      })
      .catch( this.errorHandler )
  }

   errorHandler(err) {
    console.log(err);
  }

  cardHandler(product) {
    console.log('return data', product);
    this.state.header.basket.products.push(product); //додати продукт в корзину
    this.refreshBasketStorage()
    //  this.header_state.basket = this.state.basket; // передати 
  }

  refreshBasketStorage() {
    const json = JSON.stringify(this.state.header.basket.products);
    localStorage.setItem('basket', json);
  }



  headerHandler(headerState) {
    this.state.header = headerState;
  }



  register(form) {
    console.log(form)
  }

}
