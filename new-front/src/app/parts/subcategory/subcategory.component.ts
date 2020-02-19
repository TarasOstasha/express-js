import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.less']
})
export class SubcategoryComponent implements OnInit {
  @Input() category: any
  @Input() new_category;
  constructor() { 
    if(this.category == undefined) this.category = {name:'test1', subCategories: []}
  }

  ngOnInit() {
    if(this.category == undefined) this.category = {name:'test1', subCategories: []}
  }

  delCategory(i) {
    this.category.subCategories.splice(i, 1);
  }
  addCategory(i) {
    this.category.subCategories[i].subCategories.push({
      name: this.new_category || '!!!', 
      subCategories: []
    })
  }
}
