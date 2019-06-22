import { Component, OnInit } from '@angular/core';
import { state } from '@angular/animations';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  constructor(
    private storage: StorageService,
    private api: ApiService,
    private session: SessionService
  ) { }

  // public state: any;

  cards = [
    {
      title: 'product',
      id: 1,
      img: 'assets/img/sws1.png',
      imgSport: 'assets/img/nike_Logo_White.png',
      fashionLine: 'FAS',
      model: 'Hartbee',
      modelType: 'sport',
      collection: 'Basket Ball Collection',
      size: 'size',
      typeOfSize: [7, 8, 9, 10, 11],
      selectedSize: 8,
      color: 'color',
      colorProducts: ['orange', 'green', 'yellow'],
      selectedColor: 'orange',
      text: 'description',
      price: 1,
      stars: {
        public: 50,
        privite: 35.5
      }
    },
    {
      title: 'product',
      id: 2,
      img: 'assets/img/sws1.png',
      imgSport: 'assets/img/nike_Logo_White.png',
      fashionLine: 'FAS',
      model: 'Hartbee',
      modelType: 'sport',
      collection: 'Basket Ball Collection',
      size: 'size',
      typeOfSize: [7, 8, 9, 10, 11],
      selectedSize: 8,
      color: 'color',
      colorProducts: ['orange', 'green', 'yellow'],
      selectedColor: 'orange',
      text: 'description',
      price: 2,
      stars: {
        public: 60,
        privite: 75.5
      }
    },
    {
      title: 'product',
      id: 3,
      img: 'assets/img/sws1.png',
      imgSport: 'assets/img/nike_Logo_White.png',
      fashionLine: 'FAS',
      model: 'Hartbee',
      modelType: 'sport',
      collection: 'Basket Ball Collection',
      size: 'size',
      typeOfSize: [7, 8, 9, 10, 11],
      selectedSize: 8,
      color: 'color',
      colorProducts: ['orange', 'green', 'yellow'],
      selectedColor: 'orange',
      text: 'description',
      price: 3,
      stars: {
        public: 20,
        privite: 99.5
      }
    }
  ];

  state = {
    header: {
      isLogged: false,
      user: {
        name: ''
      },
      basket: {
        open: false,
        products: []
      }
    }
  }

  ngOnInit() {
    this.state.header.basket.products = this.storage.getBasketFromStorage()

    this.session.getUser()
      .then((user) => {
        console.log('main->user:', user)
      })
      .catch((err)=>{
        console.log(err);
      })
    // this.api.getSessionInfo().subscribe((fromServer: any) => {
    //   console.log(fromServer, 'from server');
    //   //fake session
    //   if (!fromServer.user) {
    //     fromServer = JSON.parse('{"user":{"wallets":{"USD":{"balance":0}},"facebook":{"id":"2712492348826122","username":"Taras Ostasha","email":""},"purchases_made":[],"saved_numbers":[],"linked_users":[],"_id":"5d063f55ba40b4ee185dea94","last_login":"2019-06-16T13:08:37.543Z","last_appeal":"2019-06-16T13:08:37.543Z","username":"Taras Ostasha","email":"","created":"2019-06-16T13:08:37.546Z","__v":0}}')
    //     console.log(fromServer);
    //     this.state.header.isLogged = true;
    //     this.state.header.user.name = fromServer.user.firstName || fromServer.user.username;
    //   }
    // }, (err) => {
    //   console.log(err);
    // })
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

}
