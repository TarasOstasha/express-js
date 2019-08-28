import { Component, OnInit } from '@angular/core';
import  state  from '../../app-state';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {
  state: any;
  constructor() {
    this.state = state;

   }
  ngOnInit() {
  }

}
