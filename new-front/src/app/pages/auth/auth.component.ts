import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    role: 'Guest',
    notes: null
  };
  constructor(private formBuilder: FormBuilder) { 
    this.userForm = this.formBuilder.group({
      'firstName': [this.user.firstName, [Validators.required, Validators.minLength(3)]],
      'lastName': [this.user.lastName, [Validators.required]],
      'role': [this.user.role, [Validators.required]],
      'notes': [this.user.notes, [Validators.maxLength(45)]]
    });
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
