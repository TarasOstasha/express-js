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
      price: 22,
      stars: 5
    },
    {
      title: 'product',
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
      price: 22,
      stars: 4
    },
    {
      title: 'product',
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
      price: 22,
      stars: 3.7
    }
  ];
 
  state = {
    basket: []
  }
  header_state: any = {
    basket: this.state.basket
  }
  ngOnInit() {
  }
 
  cardHandler(product) {
    console.log('return data', product);
    this.state.basket.push(product);
    this.header_state = this.state
  }
  
}
