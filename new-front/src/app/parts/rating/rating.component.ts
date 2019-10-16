import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styles: ['@import"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'],
  styleUrls: ['./rating.component.less'] //how to add font-awesome in local folder?
})
export class RatingComponent implements OnChanges {
  @Input() ratingPublic;
  @Input() ratingPrivate;
  @Input() productId;
  @Input() user;
  //starWidth: number;
  //star: number = 20;
  constructor(private api: ApiService) { 

  }
  ngOnInit() {
    console.log('ratingPrivate', this.ratingPrivate)
  }
  checkedStar(icon) {
    console.log(icon); //send data to server
    console.log('productStarId',this.productId)
    console.log('ratingPrivate',this.ratingPrivate)
    this.api.addVoute({
      productId: this.productId,
      voute: icon,
      user: this.user
    });
    this.ratingPrivate = icon * 20;
  }


  ngOnChanges(): void { //method to change star width
    //this.starWidth = this.rating * 95/5; // with per digits
  }
  onClick(): void {
    //console.log(`The rating ${this.rating} was clicled`)
  }
  

 

}
