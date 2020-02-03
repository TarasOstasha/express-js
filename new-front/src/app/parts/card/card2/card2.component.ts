import { OnInit, Component, EventEmitter, Input, Output } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-card2',
  templateUrl: './card2.component.html',
  styleUrls: ['./card2.component.less']
})
export class Card2Component implements OnInit {

  @Output() onChanged = new EventEmitter<any>();

  @Input() state: any
  @Input() userId: string;
  @Input() index: number;
  
  productCardClass: string = '';
  moveArrow: string = '';

  //relative to card back carousel
  carouselSlideWidth = 335;
  carouselWidth = 0;
  isAnimating = false;
  carousel:any;
  //t = [0,1,2,3,4] // use imgSlides !!!
  hoverBlocked: boolean = false;


  constructor() {
  }

  ngOnInit() {
    this.carousel = `#carousel-${this.index} ul`;
    //const t = [0,1,2,3,4]
    //this.t.map((i)=>{
      this.carouselInit(this.index);
    //})
  }

  imgSlides: any = [
    { img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/t-shirt-large.png' },
    { img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/t-shirt-large2.png' },
    { img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/t-shirt-large3.png' },
    { img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/t-shirt-large.png' },
    { img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/t-shirt-large2.png' },
    { img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/t-shirt-large3.png' }
  ]

  buyProduct(event) {
    event.stopPropagation();
    this.onChanged.emit(this.state);
  }


  public onSelectSize(size): void {
    this.state.selectedSize = size;
    console.log(size);
  }

  async full_card() {
    console.log('card')
  }

  //code dublicate !!!! (product component and card component)
  starPrivate() {
    try {
      const myVoute = this.state.stars.voutes.filter((voute) => { // product removed
        return voute.id == this.userId; // other path for user id
      })
      //console.log('myvoute', myVoute)
      return myVoute[0].voute * 20 || 0
    } catch (error) {
      return 0;
    }
  };

  // Lift card and show stats on Mouseover
  hover() {
    console.log('try hover')
    //this.hoverBlocked = true;
    //if(!this.hoverBlocked) {
      console.log('hover')
      this.productCardClass = 'animate';
      this.moveArrow = 'visible';

   // }
    //$('#product-card').addClass('animate');
    //$('div.carouselNext, div.carouselPrev').addClass('visible');
    //$('#product-card').removeClass('animate');			
    //$('div.carouselNext, div.carouselPrev').removeClass('visible');
  }
  unhover() {
    this.flipBack()
    //this.hoverBlocked = false;
    console.log('unhover')
    this.productCardClass = '';
    this.moveArrow = '';
    //продукт фронт 0 = блок
    //продукт бек 0 = ноне
  }

  // Flip card to the back side
  detail(index) {
    const productCard = '#product-card-' + index;
    const productFront = '#product-front-' + index;
    const productBack = '#product-back-' + index;
    const cx = '#cx-' + index;
    const cy = '#cy-' + index;
    
    //$('div.carouselNext, div.carouselPrev').removeClass('visible');
    this.moveArrow = '';
    //$('#product-card').addClass('flip-10');
    this.productCardClass = 'flip-10';
    setTimeout(function () {
      this.productCardClass = 'flip90';
      
     // $('#product-card').removeClass('flip-10').addClass('flip90')
      
      $(productCard + ' div.shadow').show().fadeTo(80, 1, function () {
        $(`${productFront}, ${productFront} div.shadow`).hide();
        
      });
    }, 50);

    setTimeout(function () {
      this.productCardClass = 'flip190';
      //$('#product-card').removeClass('flip90').addClass('flip190');
      $(productBack).show().find('div.shadow').show().fadeTo(90, 0); // this line is flip card to another side
      

      setTimeout(function () {
        $(productCard).removeClass('flip190').addClass('flip180').find('div.shadow').hide();
        setTimeout(function () {
          $(productCard).css('transition', '100ms ease-out');
          $(`${cx}, ${cy}`).addClass('s1');
          setTimeout(function () { $(`${cx}, ${cy}`).addClass('s2'); }, 100);
          setTimeout(function () { $(`${cx}, ${cy}`).addClass('s3'); }, 200);
          //$('div.carouselNext, div.carouselPrev').addClass('visible');
        }, 100);
      }, 100);
    }, 150);
  }
  // Flip card back to the front side
  flipBack() {
    const index = this.index;
    const productCard = '#product-card-' + index;
    const productFront = '#product-front-' + index;
    const productBack = '#product-back-' + index;
    const cx = '#cx-' + index;
    const cy = '#cy-' + index;
    this.productCardClass = '';
    this.productCardClass = 'flip190';

    //$('#product-card').removeClass('flip180').addClass('flip190');
    setTimeout(function () {
      this.productCardClass = '';
      this.productCardClass = 'flip190';
      //$('#product-card').removeClass('flip190').addClass('flip90');

      $(productBack + ' div.shadow').css('opacity', 0).fadeTo(100, 1, function () {
        $(`${productBack}, ${productBack} div.shadow`).hide();
        $(`${productFront}, ${productFront} div.shadow`).show();
      });
    }, 50);

    setTimeout(function () {
      this.productCardClass = '';
      this.productCardClass = 'flip-10';
      //$('#product-card').removeClass('flip90').addClass('flip-10');
      $(productFront + ' div.shadow').show().fadeTo(100, 0);
      setTimeout(function () {
        $(productFront + ' div.shadow').hide();
        $(productCard).removeClass('flip-10').css('transition', '100ms ease-out');
        $(`${cx}, ${cy}`).removeClass('s1 s2 s3');
      }, 100);
    }, 150);
  }

  newLeftSlide(direction) {
    
   // const carousel = `#carousel-${index} ul`;
    var currentLeft = Math.abs(parseInt($(this.carousel).css("left")));
    var newLeft = (direction == 'left') ? currentLeft - this.carouselSlideWidth : currentLeft + this.carouselSlideWidth
    console.log(newLeft, currentLeft,this.carouselSlideWidth)
    return newLeft;
  }

  //
  
  slidePointer = 0;
  endSlider = this.imgSlides.length - 1; // останній елемент в масиві
  startSlider = this.imgSlides[0]; // 1 елемент в масиві
  //
  

  // Load Previous Image
  arrPrev() {
    this.slidePointer--;
    console.log(this.newLeftSlide('left'));
    
    //if (newLeft < 0 || this.isAnimating === true) { return; }
    console.log('next')
    $(this.carousel).css({
      'left': "-" + this.newLeftSlide('left') + "px",
      "transition": "300ms ease-out"
    });
    this.isAnimating = true;
    setTimeout(function () { this.isAnimating = false; }, 300);
  }

     
  // Load Next Image
  arrNext() {
    this.slidePointer++;

    //if (newLeft == this.carouselWidth || this.isAnimating === true) { return; }
    $(this.carousel).css({
      'left': "-" + this.newLeftSlide('right') + "px",
      "transition": "300ms ease-out"
    });
    this.isAnimating = true;
    setTimeout(function () { this.isAnimating = false; }, 300);
  }

   // building the width of the carousel
  carouselInit(index) {
    //var carousel = $('#carousel ul');
    const carousel = `#carousel-${index} ul`;

    $(carousel + ' li').each(function () {
      this.carouselWidth += this.carouselSlideWidth;
    });
    //$(carousel).css('width', this.carouselWidth);
  }

  

}
















