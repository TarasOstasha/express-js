import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subcategory-select',
  templateUrl: './subcategory-select.component.html',
  styleUrls: ['./subcategory-select.component.less']
})
export class SubcategorySelectComponent implements OnInit {
  @Input() categories;
  @Input() recurtionLevel;
  @Input() breadCrumbs;
  constructor() { }

  ngOnInit() {
  }
  state = {
    checkedCategory: {
      name: 'chop',
      subCategories:[]
    }
  };

  onChange(event) {
    console.log(event.name);
    this.breadCrumbs.splice(this.recurtionLevel, this.breadCrumbs.length - this.recurtionLevel);  // is there exist way to resolve more easier(clear)???! CUT
    this.breadCrumbs.push(event.name + " >> ")
  }
}
