import { Component, OnInit } from '@angular/core';
import { state } from '@angular/animations';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  constructor() { }
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
      basket: {
        open: true,
        products: []
      }
    }
  }

  ngOnInit() {
    
    
    
  }
 
  cardHandler(product) {
    console.log('return data', product);
    this.state.header.basket.products.push(product); //додати продукт в корзину
  //  this.header_state.basket = this.state.basket; // передати 
  }

  headerHandler(headerState) {
    this.state.header = headerState;
  }
  
}
