import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, FormArray  } from '@angular/forms';
import { User } from '../../interfaces/user';


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
    role: 'Guest',
    notes: null
  };
  constructor(private formBuilder: FormBuilder) { 
    this.userForm = this.formBuilder.group({
      'email': [this.user.email, [Validators.required, Validators.minLength(5),this.mailValidator()]],
      'firstName': [this.user.firstName, [Validators.required, Validators.minLength(3)]],
      'lastName': [this.user.lastName, [Validators.required]],
      'password': [this.user.password, [Validators.required,this.passwordConfirm()]],
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
      if ( (group.dirty || group.touched) ) {
        return {custom: 'Something going wrong'} 
      } else {
        return null;
      }
      
    };
  }

  //check password equal
  private passwordsAreEqual(): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
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
    setInterval(()=>{
      console.log(this.userForm)
    }, 1000)
  }
  test() {
    console.log(this.userForm);
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
