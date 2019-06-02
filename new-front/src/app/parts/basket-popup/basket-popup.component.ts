import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { state } from '@angular/animations';
import { providerDef } from '@angular/core/src/view';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

@Component({
  selector: 'app-basket-popup',
  templateUrl: './basket-popup.component.html',
  styleUrls: ['./basket-popup.component.less'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '',
        opacity: 1,
      })),
      state('closed', style({
        height: '0',
        opacity: 0.5,
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class BasketPopupComponent implements OnInit {
  constructor() { }

  @Output() onChanged = new EventEmitter<any>(); //генератор подій
  @Input() state: any
  
  ngOnInit() { 
    this.state.showPaymant = 'myClose';
  }

  private phoneValidator(): ValidatorFn {
    const pattern: RegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return (control: AbstractControl): { [key: string]: any } => {
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return pattern.test(control.value) ? null : { custom: `Invalid phone number` };
      }
    };
  }
  
  disabled: boolean = false;
  onClose() {
    this.state.open = false;
    //this.stateBack()  
  }

  // open checkout block with animation
  openCheckout() {
    this.state.showPaymant = 'fixedOpen';
    setTimeout(() => {
      this.state.showPaymant = 'OpenFit';
    },1000)
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

