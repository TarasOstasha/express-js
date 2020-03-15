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
declare var window: any;
declare var swal: any;
declare var paypal: any
//declare var elementsModal: any;

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
export class BasketPopupComponent implements OnInit { //AfterViewInit, also add
  paymentForm: FormGroup; //set type
  @ViewChild('cardInfo') cardInfo: ElementRef;
  @Input() it: any;
  card: any;
  cardHandler = this.onChange.bind(this);
  error: String;
  paymentType: String;
  promoCode: String;
  discount: any = 0;

  constructor(
    private storage: StorageService,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private cd: ChangeDetectorRef
  ) {
    this.state = {} //check if needed
    this.state.paymentData = {
      firstName: '',
      lastName: '',
      email: ''
    }
    // this.state.defaultData = {
    //   states: []
    // }


    const paymantValidators: ValidatorFn[] = [Validators.required, Validators.minLength(6), Validators.maxLength(20)];

    this.paymentForm = this.formBuilder.group({
      //'name': [this.state.paymentData.name, [Validators.required, Validators.minLength(2)]],
      'firstName': [this.state.paymentData.firstName, [Validators.required, Validators.minLength(5)]],
      'lastName': [this.state.paymentData.lastName, [Validators.required, Validators.minLength(2)]],
      'email': [this.state.paymentData.email, [Validators.required, Validators.minLength(5), this.mailValidator()]]
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
    this.state.products = this.storage.getBasketFromStorage();
  }
  //check email repeating from auth components!!!!! need to fix it   !!!!!!!
  private mailValidator(): ValidatorFn {
    const error_message = { mailValidator: { msg: `Invalid email` } };
    const pattern: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return (control: AbstractControl) => {
      const isValid = pattern.test(control.value);
      return isValid ? null : error_message
    }
  }

  ngAfterViewInit() { }
  ngOnDestroy() { }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
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

  async getDataForCheckout() {
    const json = await this.api.getJson('us-states.json');
    let result = [];
    for (var i in json) result.push([i, json[i]]);
    this.state.defaultData.states = result;
    //console.log(result);
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
      const alreadyExist = result.some((unitedProduct) => unitedProduct.product._id == product._id)
      if (alreadyExist) {
        let upIndex;
        result.map((unitedProduct, i) => {
          if (unitedProduct.product._id == product._id) upIndex = i;
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
    console.log(id, '')
    //видалити один продукт по id
    let oneDeleted = false;
    this.state.products.map((product, i) => {
      if ((product._id == id) && !oneDeleted) {
        this.state.products.splice(i, 1)
        oneDeleted = true;
      }
    })
    this.state.open = true;
    this.stateBack()
  }
  deleteProduct(id) {
    console.log(id)
    console.log(this.state.products.filter(product => product._id != id))
    //видалити всі продукти по id
    this.state.products = this.state.products.filter(product => product._id != id);
  }

  minus(product) {
    console.log(product, 'product-minus')
    this.removeOne(product._id)
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
  totalPriceDiscount() {
    return this.totalPrice() - (this.totalPrice()/100 * this.discount);
  }


  saveAdress() {
    // if(this.paymentForm.value.email && this.paymentForm.value.firstName && this.paymentForm.value.lastName == null) {
    //   alert('fill out the form fields')
    // }
    console.log('adress', this.paymentForm);
  }

  paymentTransaction() {
    window.elementsModal.create({
      type: 'stripe',
      totalPrice: this.totalPrice(),
      // the modal demo will handle non-zero currencies automatically
      // items sent into the server can calculate their amounts and send back to the client
      items: [{ sku: "sku_1234", quantity: 1 }],
      // Supported currencies here https://stripe.com/docs/currencies#presentment-currencies
      currency: "USD",
      businessName: this.lastName.value,
      productName: this.totalProductName(),
      customerEmail: this.email.value,
      customerName: this.firstName.value,
    });
  }

  async paymentTransactionPayPal(details) {
    const fromServer: any = await this.api.payPalPayment({
      type: 'paypall',
      totalPrice: this.totalPrice(),
      items: [{ sku: "sku_1234", quantity: 1 }],
      currency: "USD",
      businessName: details.payer.name.given_name,
      productName: this.totalProductName(),
      customerEmail: details.payer.email_address,
      customerName: details.payer.name.surname,
      paymentData: details
    })
    console.log(fromServer)
    if (fromServer.ok) {
      this.state.products = [];
      this.onClose();
      this.storage.clearItem('basket');
    }
  }
  paypalInit() {paypal
    if(this.paymentType == 'paypal') return
    setTimeout(() => {
      paypal.Buttons({
        createOrder: (data, actions) => {
          // This function sets up the details of the transaction, including the amount and line item details.
          console.log('createOrder', this.totalPrice())
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.totalPrice()
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          // This function captures the funds from the transaction.
          return actions.order.capture().then((details) => {
            // This function shows a transaction success message to your buyer.
            this.paymentTransactionPayPal(details)//.bind(this);
            //console.log(details)
            alert('Transaction completed by ' + details.payer.name.given_name);

          })//;
        }
      }).render('#paypal-button-container')
    }, 500)

  }

  placeOrder() {
    console.log(this.paymentForm.valid)

    //validation in place order
    if (!this.paymentForm.valid) {
      swal.fire({
        title: "Error",
        text: "Fill out the form fields",
        icon: "error",
      })
      return
    }
    this.paymentTransaction();
    const checkPaymentWindow = setInterval(() => {
      const paymentWindow = document.querySelector('.ElementsModal--modal');
      if (paymentWindow) {
        window.elementsModal.toggleElementsModalVisibility();
        clearInterval(checkPaymentWindow);
      }
    }, 100)
  }
  totalProductName() {
    let boughtProducts = '';
    this.preparedProducts().map((item) => {
      boughtProducts += ` ${item.product.productName} (${item.amount}),  `
    })
    return boughtProducts;
  }
  // promo code
  async promoChanged() {
    const promo: any = await this.api.getPromoCode(this.promoCode);
    if(promo) {
      const curentDate = new Date().getSeconds();
      const expiredDate = new Date(promo.expired).getSeconds();
      if( curentDate > expiredDate ) {
        alert('promo code expired');
      }else {
        console.log('done, need to show on page by style')
        this.discount = promo.discount;
      }
      this.discount = promo.discount;

    }else {
      console.log('not exist promo, need to show on page by style')
    }
    console.log(promo)
  }


  //QUESTION REF=GARDING VALIDATION. I'V GOT SOME ERORROR

  // testProduct() {
  //   console.log('!!!Products Items!', this.state.products, this.preparedProducts());

  // }

  //get value payment from payment form fields 
  get firstName() { return this.paymentForm.get('firstName') } // getter to firstName 
  get lastName() { return this.paymentForm.get('lastName') } // getter to first name
  get email() { return this.paymentForm.get('email') } //getter to email

 //// promo code
  
}





