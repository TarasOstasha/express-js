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
  // state = {
  //   open: false
  // }
  @Output() onChanged = new EventEmitter<any>(); //генератор подій
  @Input() state: any
  ngOnInit() {
    setInterval(()=> {
      console.log(this.preparedProducts());
    },1000)
  }

  onClose() {
    this.state.open = false;
    this.stateBack()  
  }

  deleteProduct(id) {
    console.log(id);
    //видалити всі продукти по id
    const example = this.state.products.filter(product => product.id != id) 
   //видалити один продукт по id
   let oneDeleted = false;
    this.state.products.map((product, i)=>{
      if((product.id == id) && !oneDeleted) {
        this.state.products.splice(i, 1)
        oneDeleted = true;  
      }
    })
    this.state.open = true;
    this.stateBack() 
  }

  stateBack() {
    this.onChanged.emit(this.state); //згенерувати подію, this.state - обєкт події/подія
  }

  preparedProducts() {
    const result = [];
    this.state.products.map((product, i)=> { //якщо є хоча б один в масиві резалт продукт
      const alreadyExist = result.some((unitedProduct) => unitedProduct.product.id == product.id )
      if(alreadyExist) {
        let upIndex;
        result.map((unitedProduct, i) => {
          if(unitedProduct.product.id == product.id) upIndex = i;
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

}

