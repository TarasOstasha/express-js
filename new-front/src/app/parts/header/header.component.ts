import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SearchService } from '../../services/search.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Input() state: any
  @Output() onChanged = new EventEmitter<any>();
  searchTerm$ = new Subject<string>();
  constructor(
      private api: ApiService,
      private searchService: SearchService
  ) { 
    this.searchService.search(this.searchTerm$)
      .subscribe(results => {
        this.state.searchResult = results; //set search result into array
        console.log(results);
      });
  }

  ngOnInit() {
  }
  //showBasked: boolean = false;
  onShowBasket(): void {
    this.state.basket.open = true;
  }
  basketHandler(basketState) {
    //this.showBasked = basketState.open;
    this.state.basket = basketState;
    this.stateBack();
  }
  stateBack() {
    this.onChanged.emit(this.state);
  }
  showProfile() {
    alert('see profile preferenses');
  }



}
