import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-basket-popup',
  templateUrl: './basket-popup.component.html',
  styleUrls: ['./basket-popup.component.less']
})
export class BasketPopupComponent implements OnInit {
  constructor() { }
  // state = {
  //   open: false
  // }
  @Output() onChanged = new EventEmitter<any>(); //генератор подій
  @Input() state: any
  ngOnInit() {
    // test
    console.log('Hello from basket :)')
  }

  onClose() {
    this.state.open = false;
    this.onChanged.emit(this.state); //згенерувати подію, this.state - обєкт події/подія
  }

  deleteProduct(id) {
    console.log(id);
    this.state.products = this.state.products.filter(product => product.id != id)
  }

}
