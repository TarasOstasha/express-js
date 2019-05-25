import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styles: ['@import"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'],
  styleUrls: ['./rating.component.less'] //how to add font-awesome in local folder?
})
export class RatingComponent implements OnChanges {
  @Input() rating: number
  starWidth: number;



  ngOnChanges(): void { //method to change star width
    this.starWidth = this.rating * 95/5; // with per digits
  }
  onClick(): void {
    console.log(`The rating ${this.rating} was clicled`)
  }
  constructor() { }

  // ngOnInit() {
  // }

}
