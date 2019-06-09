import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, FormArray  } from '@angular/forms';
import { User } from '../../interfaces/user';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {
  userForm: FormGroup;
  roles: Array<string> = [
    'Guest',
    'Admin',
    'Owner',
    'Operator'
  ];
  user: User = {
    firstName: '',
    lastName: '',
    email:'',
    password: '',
    password1: '',
    password2: '',
    role: 'Guest',
    notes: null
  };
  constructor(
      private formBuilder: FormBuilder, 
      private storage: StorageService,
      private api:  ApiService ) { 
    const pwdValidators: ValidatorFn[] = [Validators.required, Validators.minLength(6), Validators.maxLength(20)];


    this.userForm = this.formBuilder.group({
      'email': [this.user.email, [Validators.required, Validators.minLength(5),this.mailValidator()]],
      'firstName': [this.user.firstName, [Validators.required, Validators.minLength(3)]],
      'lastName': [this.user.lastName, [Validators.required]],
      'password': [this.user.password, [Validators.required,this.passwordConfirm()]],
      //'password1': [this.user.password, [Validators.required,Validators.minLength(3),this.passwordsAreEqual()]],

      'passwords': this.formBuilder.group({
        'pwd': ['', pwdValidators],
        'confirm': ['', pwdValidators]
      }, { validator: this.passwordsAreEqual() }),

      //'password2': [this.user.password, [Validators.required,Validators.minLength(3),this.passwordsAreEqual()]],
      'role': [this.user.role, [Validators.required]],
      'notes': [this.user.notes, [Validators.maxLength(45)]]
    });
  }

  //check email
  private mailValidator(): ValidatorFn {
    const pattern: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return (control: AbstractControl): { [key: string]: any } => {
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return pattern.test(control.value) ? null : { custom: `Invalid email` };
      }
    };
  }
  //check password
  private passwordConfirm(): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
      if ( !(group.dirty || group.touched) ) {
        return {custom: 'Something going wrong'} 
      } else {
        return null;
      }
      
    };
  }

  //check password equal
  private passwordsAreEqual(): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
      console.log(group.get('password'))
      if (!(group.dirty || group.touched) || group.get('pwd').value === group.get('confirm').value) {
        return null;
      }
      return {
        custom: 'Passwords are not equal'
      };
    };
  }
  state = {
    header: {
      basket: {
        open: false,
        products: []
      }
    },
    checked_form :'login'
  }
  
  ngOnInit() {
    this.state.header.basket.products = this.storage.getBasketFromStorage()
    //setInterval(()=>{
      //console.log(this.userForm)
    //}, 1000)
  }
  signIn() {
    const userData = {
      email: this.userForm.controls.email.value,
      password: this.userForm.controls.password.value
    }
    this.api.login(userData).subscribe(
      (fromServer) => {
        console.log('result', fromServer);
      },
      (error) => { console.log(error) }
    )
  }
  register() {
    console.log('register clicked!');
    const userData = {
      firstName:this.userForm.controls.firstName.value,
      lastName:this.userForm.controls.lastName.value,
      email: this.userForm.controls.email.value,
      password: this.userForm.controls.password.value
    }
    this.api.register(userData).subscribe(
      (fromServer) => {
        console.log('result', fromServer);
      },
      (error) => { console.log(error) }
    )
   }
  logForm(){
    console.log(this.userForm);
    
   }
 
   logFormValue(){
     console.log(this.userForm.value);
   }
 
   disableForm(){
     this.userForm.disable();
   }
 
   enableForm(){
     this.userForm.enable();
   }



}
