import { Component, OnInit, } from '@angular/core';
import appState from '../../app-state';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { ApiService } from '../../services/api.service';
declare var swal: any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.less']
})
export class ContactsComponent implements OnInit {
  appState: any;
  contactsForm: FormGroup;

  mail: any = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,

  ) {
    this.appState = appState;
    
    this.contactsForm = this.formBuilder.group({
      'name': [this.mail.name, [Validators.required, Validators.minLength(5)]],
      'email': [this.mail.email, [Validators.required, Validators.minLength(5), this.mailValidator()]],
      'subject': [this.mail.subject, [Validators.required, Validators.minLength(15)]],
      'message': [this.mail.message, [Validators.required, Validators.minLength(10)]],
    })
  }

  ngOnInit() {
   // SWAL !!!!!!
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

  async sendContact() {
    console.log(this.contactsForm);
    const formData = { ...this.contactsForm.value }
    console.log('Form Data', formData);

    try {
      console.log(this.contactsForm.status)
      if (this.contactsForm.status == "VALID") {
        const contactsData = {
          name: this.contactsForm.controls.name.value,
          email: this.contactsForm.controls.email.value,
          subject: this.contactsForm.controls.subject.value,
          message: this.contactsForm.controls.message.value
        }
        const fromServer = await this.api.contactsMail(contactsData);
        console.log(fromServer)
        this.contactsForm.reset();

      } else {
        
        swal.fire({
          icon: "error",
          title: "Error",
          text: "Please Fill Out The Form"
        })
      }
    } catch (error) {
      console.log(error);
    }

  }
  // getter to start working our validators (from form builder component)
  get name() { return this.contactsForm.get('name') }
  get email() { return this.contactsForm.get('email') }
  get subject() { return this.contactsForm.get('subject') }
  get message() { return this.contactsForm.get('message') }
}
