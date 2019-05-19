import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  constructor() { }
  // public state: any;
  card_state = {
    title: 'product',
    img: 'assets/img/1.jpg',
    text: 'description',
    price: 22
  }
  ngOnInit() {
  }
  cardHandler(data) {
    console.log('return data', data);
  }
}
