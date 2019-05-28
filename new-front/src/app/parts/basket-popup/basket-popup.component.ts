import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { state } from '@angular/animations';
import { providerDef } from '@angular/core/src/view';

@Component({
  selector: 'app-basket-popup',
  templateUrl: './basket-popup.component.html',
  styleUrls: ['./basket-popup.component.less']
})
export class BasketPopupComponent implements OnInit {
  constructor() { }

  @Output() onChanged = new EventEmitter<any>(); //генератор подій
  @Input() state: any
  ngOnInit() { }

  onClose() {
    this.state.open = false;
    //this.stateBack()  
  }


  //stateBack() на даний момент не використовується
  stateBack() {
    this.onChanged.emit(this.state); //згенерувати подію, this.state - обєкт події/подія
  }

  preparedProducts() {
    const result = [];
    this.state.products.map((product, i) => { //якщо є хоча б один в масиві резалт продукт
      const alreadyExist = result.some((unitedProduct) => unitedProduct.product.id == product.id)
      if (alreadyExist) {
        let upIndex;
        result.map((unitedProduct, i) => {
          if (unitedProduct.product.id == product.id) upIndex = i;
        })
        result[upIndex].amount++
      } else {
        result.push({
          product,
          amount: 1
        })
      }
    })
    return result;
  }
  removeOne(id) {
    //видалити один продукт по id
    let oneDeleted = false;
    this.state.products.map((product, i) => {
      if ((product.id == id) && !oneDeleted) {
        this.state.products.splice(i, 1)
        oneDeleted = true;
      }
    })
    this.state.open = true;
    this.stateBack()
  }
  deleteProduct(id) {
    //видалити всі продукти по id
    this.state.products = this.state.products.filter(product => product.id != id)
  }

  minus(product) {
    this.removeOne(product.id)
  }
  plus(product) {
    this.state.products.push(product);
  }

  totalPrice() {
    let total = 0;
    this.state.products.map((product)=> {
      total+= product.price;
    })
    return total;
  }
  subTotalPrice(uProduct) {
    return uProduct.amount * uProduct.product.price;
  }
}

