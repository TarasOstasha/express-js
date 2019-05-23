import { OnInit, Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less']
})
export class CarouselComponent implements OnInit {
  constructor() {
   
  }
  test: string = 'test taras'
  imgSlides: any = [
    {
      img: 'assets/img/sws1.png',
      test2:'test'
    },
    {
      img:'assets/img/2015-Nike-Mag-02_hd_1600.jpg'
    },
    {
      img:'assets/img/18-420_Nike_Paul_George_3_Heroes_04_Surface-02_rectangle_1600.jpg'
   }
  ]
  slidePointer = 0;
  endSlider = this.imgSlides.length - 1;
  moveLeft() {
    if(this.slidePointer == 0) this.slidePointer = this.endSlider
    else this.slidePointer--;
  }
  moveRight() {
    this.slidePointer++;
  }
  ngOnInit() {
  }
   
}
