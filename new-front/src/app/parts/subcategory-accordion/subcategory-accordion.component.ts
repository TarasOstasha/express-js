import { Component, OnInit, Input } from '@angular/core';
import appState from 'src/app/app-state';

@Component({
  selector: 'app-subcategory-accordion',
  templateUrl: './subcategory-accordion.component.html',
  styleUrls: ['./subcategory-accordion.component.less']
})
export class SubcategoryAccordionComponent implements OnInit {
  @Input() categories;
  @Input() recurtionLevel;
  @Input() breadCrumbs;
  appState:any = appState;

  constructor() { }

  ngOnInit() {
     console.log(this.recurtionLevel)
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
    this.breadCrumbs.push(event.name)
  }

  toogleCategory(category) {
    this.appState.subcategoryAccordion.items[category.name] = !this.appState.subcategoryAccordion.items[category.name];
    category.open = !category.open;
  }

  getItemState(category) {
    return appState.subcategoryAccordion.items[category]
  }

  

  alert = ()=> alert('hello')


}
