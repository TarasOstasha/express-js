import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.less']
})
export class SubcategoryComponent implements OnInit {
  @Input() subcategory: any
  constructor() { 
    if(this.subcategory == undefined) this.subcategory = {name:'test1', subCategories: []}
  }

  ngOnInit() {
    if(this.subcategory == undefined) this.subcategory = {name:'test1', subCategories: []}

  }

}
