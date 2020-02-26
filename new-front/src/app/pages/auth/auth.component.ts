import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { User } from '../../interfaces/user';
import { StorageService } from '../../services/storage.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import appState from '../../app-state';
import { SessionService } from '../../services/session.service';
declare var location: any;
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
    email: '',
    password: '',
    password1: '',
    password2: '',
    role: 'Guest',
    notes: null
  };
  appState: any;
  constructor(
    private formBuilder: FormBuilder,
    private storage: StorageService,
    private api: ApiService,
    private router: Router,
    private session: SessionService
  ) {
    this.appState = appState;
    const pwdValidators: ValidatorFn[] = [Validators.required, Validators.minLength(6), Validators.maxLength(20)];


    this.userForm = this.formBuilder.group({
      'email': [this.user.email, [Validators.required, Validators.minLength(5), this.mailValidator()]],
      'firstName': [this.user.firstName, [Validators.required, Validators.minLength(3)]],
      'lastName': [this.user.lastName, [Validators.required]],
      //'password': [this.user.password, [Validators.required]],
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
    const error_message = { mailValidator: { msg: `Invalid email` } };
    const pattern: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return (control: AbstractControl) => {
      const isValid = pattern.test(control.value);
      return isValid ? null : error_message
    }

  }


  //check password equal
  private passwordsAreEqual(): ValidatorFn {
    const error_message = { passwordsAreEqual: { msg: 'Passwords are not equal' } }
    return (group: FormGroup) => {
      const isEqual = group.get('pwd').value === group.get('confirm').value;
      return isEqual ? null : error_message;
    };
  }


  state = {
    header: {
      isLogged: false,
      user: {
        name: ''
      },
      basket: {
        open: false,
        products: []
      }
    },
    checked_form: 'login',
    error: {
      dublicate_user: false
    }
  }

  ngOnInit() {
    console.log('this is pwd', this.pwd);
    this.state.header.basket.products = this.storage.getBasketFromStorage()
    // setInterval(() => {
    //   console.log(this.userForm)
    // }, 1000)
  }
  async signIn() {
    try {
      if(location.port == 4200) { return alert('login works only on port 80(not cross domain)') }
      const userData = {
        email: this.userForm.controls.email.value,
        password: this.pwd.value
      }
      console.log('sign in')
      const fromServer: any = await this.api.login(userData)
      this.userForm.reset()
      console.log('result', fromServer);
      if (fromServer.ok) {
        // this.state.header.isLogged = true;
        // this.state.header.user.name = fromServer.user.firstName;
        this.appState.header.isLogged = true;
        this.appState.header.user.name = fromServer.user.firstName;
        this.session.getUser() // set user to local storage
        setInterval(()=> this.router.navigateByUrl('/') ,500);
      }
    } catch (error) {
      console.log(error)
    }
  }
  async register() {
    try {
      console.log('register clicked!');
      const userData = {
        firstName: this.userForm.controls.firstName.value,
        lastName: this.userForm.controls.lastName.value,
        email: this.userForm.controls.email.value,
        password: this.pwd.value
      }
      const fromServer: any = await this.api.register(userData)
      this.userForm.reset()
      if (fromServer.ok == false) this.state.error.dublicate_user = true;

      console.log('result', fromServer);
    } catch (error) {
      console.log(error)
    }
  }
 

  logForm() {
    console.log(this.userForm);

  }

  logFormValue() {
    console.log(this.userForm.value);
  }

  disableForm() {
    this.userForm.disable();
  }

  enableForm() {
    this.userForm.enable();
  }


  get email() { return this.userForm.get('email') } // getter to email 
  //get password() { return this.userForm.get('password') } // getter to password 
  get firstName() { return this.userForm.get('firstName') } // getter to firstName 
  get lastName() { return this.userForm.get('lastName') } // getter to lastName
  get pwd() { return this.userForm.get('passwords.pwd') } //getter to pwd from group
  get confirm() { return this.userForm.get('passwords.confirm'); } //getter password equal
  get passwords() { return this.userForm.get('passwords'); }

}


//606330336522613