import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.less']
})
export class ProductSliderComponent implements OnInit {
  //@ViewChild('measure') mesuareWidth: ElementRef;
  @Input() state: any
  @Input() index: number;
  
  @Input() products
  @Input() userId

  meseareWidth: any; // number in px
  measure; // link to DOM element
  constructor() { }

  cardWidth; //number in px
  card; //link to DOM element

  containerCardWidth; // number in px
  containerCard; ////link to DOM element



  ngAfterViewInit() {
    
  }

  ngOnInit() {
    this.containerCard = document.querySelector('.container-card');
    this.containerCardWidth = this.containerCard.clientWidth;
    console.log('!!!Container Width', this.containerCard.clientWidth)


    this.measure = document.querySelector('#measure');
    //console.log(this.measure.clientWidth)
    this.meseareWidth = this.measure.clientWidth;
    console.log(this.products)
    const checkArray = setInterval(()=>{
      if(this.products.length > 0) {
        this.card = document.querySelector('.card');
        this.cardWidth = this.card.clientWidth;
        console.log(this.cardWidth)
        clearInterval(checkArray);
      }
    },500)

  }
  position: number = 0;
  mouseCurrent: number = 0;
  mouseInitial: number = 0;
  pressed: boolean = false;

  click(click, event) {
    if (click == 'down') this.pressed = true;
    else this.pressed = false;
    this.mouseInitial = event.x;
    console.log()

  }
  onMouseMove(e) {
    if (this.pressed) {
      this.mouseInitial = this.mouseCurrent;
      this.mouseCurrent = e.x;
      this.position += this.mouseCurrent - this.mouseInitial;
    }
  }

  // buttons switch slider
  left() {
    this.position -= this.cardWidth/2;
    if(this.meseareWidth + this.position < 0 ) {
      this.position = 0;
    } 
  
  }
  right() {
    console.log(this.products.length)
    this.position += this.cardWidth/2;
    if(this.position > 0) {
      this.position = -this.meseareWidth;
    } 
  }
  //1301
  
}
