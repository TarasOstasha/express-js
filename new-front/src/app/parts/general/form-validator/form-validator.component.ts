import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-form-validator',
  templateUrl: './form-validator.component.html',
  styleUrls: ['./form-validator.component.less']
})
export class FormValidatorComponent implements OnInit {
  @Input() it: any;
  constructor() { }

  ngOnInit() {
  }

}
