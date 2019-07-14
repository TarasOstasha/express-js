import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { state } from '@angular/animations';
import { providerDef } from '@angular/core/src/view';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';

declare var stripe: any;
declare var elements: any;

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
export class BasketPopupComponent implements OnInit,  OnDestroy { //AfterViewInit, also add
  paymentForm: FormGroup; //set type
  //@ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;


  constructor(
    private storage: StorageService,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private cd: ChangeDetectorRef
  ) {
    this.state = {} //check if needed
    this.state.paymentData = {}
    // this.state.defaultData = {
    //   states: []
    // }


    const paymantValidators: ValidatorFn[] = [Validators.required, Validators.minLength(6), Validators.maxLength(20)];

    this.paymentForm = this.formBuilder.group({
      'name': [this.state.paymentData.name, [Validators.required, Validators.minLength(2)]]
      // 'firstName': [this.user.firstName, [Validators.required, Validators.minLength(3)]],
      // 'lastName': [this.user.lastName, [Validators.required]],
      // 'password': [this.user.password, [Validators.required, this.passwordConfirm()]],
      // //'password1': [this.user.password, [Validators.required,Validators.minLength(3),this.passwordsAreEqual()]],

      // 'passwords': this.formBuilder.group({
      //   'pwd': ['', pwdValidators],
      //   'confirm': ['', pwdValidators]
      // }, { validator: this.passwordsAreEqual() }),

      // //'password2': [this.user.password, [Validators.required,Validators.minLength(3),this.passwordsAreEqual()]],
      // 'role': [this.user.role, [Validators.required]],
      // 'notes': [this.user.notes, [Validators.maxLength(45)]]
    });
  }

  @Output() onChanged = new EventEmitter<any>(); //генератор подій
  @Input() state: any;

  ngOnInit() {
    this.state.showPaymant = 'myClose';
    //quantity of products
    this.state.products = this.storage.getBasketFromStorage()
  }

  // ngAfterViewInit() {
  //   this.card = elements.create('card');
  //   this.card.mount(this.cardInfo.nativeElement);
  //   this.card.addEventListener('change', this.cardHandler);
  //   const style = {
  //     base: {
  //       lineHeight: '24px',
  //       fontFamily: 'monospace',
  //       fontSmoothing: 'antialiased',
  //       fontSize: '19px',
  //       '::placeholder': {
  //         color: 'purple'
  //       }
  //     }
  //   }
  //   this.card = elements.create('card', { style });
  //   this.card.mount(this.cardInfo.nativeElement);

  //   this.card.addEventListener('change', this.cardHandler);
  // }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }
  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  // async onSubmit(form: NgForm) {
  //   const { token, error } = await stripe.createToken(this.card);

  //   if (error) {
  //     console.log('Something is wrong:', error);
  //   } else {
  //     console.log('Success!', token);
  //     // ...send the token to the your backend to process the charge
  //   }
  // }



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

  getDataForCheckout() {
    this.api.getJson('us-states.json').subscribe((json) => {

      let result = [];
      for (var i in json)
        result.push([i, json[i]]);



      // console.log(this.state.defaultData.states)
      this.state.defaultData.states = result;
      console.log(result);

      //console.log(json, 'AK' in json);
      //if('AK' in json) console.log(json['AK']);


    }, () => {

    })
  }
  // open checkout block with animation
  openCheckout() {
    this.state.showPaymant = 'fixedOpen';
    setTimeout(() => {
      this.state.showPaymant = 'OpenFit';
    }, 1000)
    this.getDataForCheckout()
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
    this.state.products.map((product) => {
      total += product.price;
    })
    return total;
  }
  subTotalPrice(uProduct) {
    return uProduct.amount * uProduct.product.price;
  }


  saveAdress() {
    console.log('adress', this.paymentForm);
  }
}

