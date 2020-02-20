import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import state from '../../app-state';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.less']
})
export class CategoriesComponent implements OnInit {
  appState:any;
  state: any; //remove

  constructor(private route: ActivatedRoute) {
    this.state = state;
    this.appState = state;
   }

  ngOnInit() {
    let category = this.route.snapshot.paramMap.get('category');
    console.log('!!!!!!!!!!!!!!!!!!!!!!!',category);
  }


  //when press on category -> move to query name of category
}
