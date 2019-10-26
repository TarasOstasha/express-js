import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subcategory-select',
  templateUrl: './subcategory-select.component.html',
  styleUrls: ['./subcategory-select.component.less']
})
export class SubcategorySelectComponent implements OnInit {
  @Input() categories;
  constructor() { }

  ngOnInit() {
  }
  state = {};

  checkedEvent() {
    console.log('checked event');
  }
}
