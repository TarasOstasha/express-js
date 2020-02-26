import { Component, OnInit, Input, HostListener } from '@angular/core';
import appState from 'src/app/app-state';
import { Router } from '@angular/router';
@Component({
  selector: 'app-subcategory-accordion',
  templateUrl: './subcategory-accordion.component.html',
  styleUrls: ['./subcategory-accordion.component.less']
})
export class SubcategoryAccordionComponent implements OnInit {
  @Input() categories;
  @Input() recurtionLevel;
  @Input() breadCrumbs;
  appState: any = appState;
  urlTail: any;

  //method stop event bubble
  @HostListener("click", ["$event"])
  public onClick(event: any): void {
    event.stopPropagation();
  }

  constructor(private router: Router) { }

  ngOnInit() {
    this.urlTail = this.getUrlTail();
  }

  state = {
    checkedCategory: {
      name: 'chop',
      subCategories: []
    }
  };

  toogleCategory(category) {
    this.breadCrumbs.splice(this.recurtionLevel, this.breadCrumbs.length - this.recurtionLevel);  // is there exist way to resolve more easier(clear)???! CUT
    this.breadCrumbs.push(category.name)
    console.log(category.name, this.recurtionLevel, this.breadCrumbs)
    this.appState.subcategoryAccordion.items[category.name] = !this.appState.subcategoryAccordion.items[category.name];
    category.open = !category.open;
    this.router.navigate(['/categories/' + this.breadCrumbs.join('-')]);
  }

  getItemState(category) {
    return appState.subcategoryAccordion.items[category]
  }

  getUrlTail() {
    const urlArr = location.pathname.split('/');
    return urlArr[urlArr.length - 1].split('-');
  }


  alert = () => alert('hello')


}
