import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Input() state: any
  @Output() onChanged = new EventEmitter<any>();
  constructor() { }

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

}
