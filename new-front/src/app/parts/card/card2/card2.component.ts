import { OnInit, Component, EventEmitter, Input, Output } from '@angular/core';
import appState from '../../../app-state';
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
  productBackClass: string = 'flip90';
  moveArrow: string = '';

  //relative to card back carousel
  carouselSlideWidth = 335;
  carouselWidth = 0;
  isAnimating = false;
  carousel: any;
  //t = [0,1,2,3,4] // use imgSlides !!!

  unhoverCardPoint: boolean = true;
  hoverFlip: boolean = false;
  hideFront: boolean = false;
  url = appState.hostName;
  constructor() {
  }

  ngOnInit() {
    // lazy img loading
    const imageObserver = new IntersectionObserver((entries, imgObserver) => {
      entries.forEach((entry: any) => {
        const lazyImage = entry.target;
        if (entry.isIntersecting) lazyImage.src = lazyImage.dataset.image;
      })
    });
    document.querySelectorAll('.product-img').forEach((v) => {
      imageObserver.observe(v);
    })

    this.carousel = `#carousel-${this.index} ul`;
    this.carouselInit(this.index);
    //console.log(this.state.imgs, '-this.state.imgs')
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
    //alert('try hover')
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
    console.log('unhover')
    this.productCardClass = '';
    this.moveArrow = '';
  }

  flip() {
    this.hoverFlip = true;
    setTimeout(() => {
      this.hideFront = true;
    }, 150)
  }

  close() {
    this.hoverFlip = false;
    setTimeout(() => {
      this.hideFront = false;
    }, 150)
  }

  // Flip card to the back side
  detail(index) {
    const productCard = '#product-card-' + index;
    const productFront = '#product-front-' + index;
    const productBack = '#product-back-' + index;
    const cx = '#cx-' + index;
    const cy = '#cy-' + index;
    this.moveArrow = '';
    this.productCardClass = 'flip-10';

    setTimeout(function () {
      this.productCardClass = 'flip90';
      $(productCard + ' div.shadow').show().fadeTo(80, 1, function () {
        $(`${productFront}, ${productFront} div.shadow`).hide();
      });
    }, 50);

    setTimeout(() => {
      //this.productCardClass = 'flip190';
      $(productBack).show().find('div.shadow').show().fadeTo(90, 0);  // hide shadow
      setTimeout(() => {
        this.productBackClass = 'flip0'
        setTimeout(function () {
          $(`${cx}, ${cy}`).addClass('s1');
          setTimeout(function () { $(`${cx}, ${cy}`).addClass('s2'); }, 100);
          setTimeout(function () { $(`${cx}, ${cy}`).addClass('s3'); }, 200);
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

    setTimeout(function () {
      //this.productCardClass = '';
      this.productCardClass = 'flip190';

      $(productBack + ' div.shadow').css('opacity', 0).fadeTo(100, 1, function () {
        $(`${productBack}, ${productBack} div.shadow`).hide();
        $(`${productFront}, ${productFront} div.shadow`).show();
      });
    }, 50);

    setTimeout(function () {
      //this.productCardClass = '';
      this.productCardClass = 'flip-10';
      $(productFront + ' div.shadow').show().fadeTo(100, 0);

      setTimeout(function () {
        $(productFront + ' div.shadow').hide();
        $(`${cx}, ${cy}`).removeClass('s1 s2 s3');
      }, 100);
    }, 150);
  }

  newLeftSlide(direction) {
    var currentLeft = Math.abs(parseInt($(this.carousel).css("left")));
    var newLeft = (direction == 'left') ? currentLeft - this.carouselSlideWidth : currentLeft + this.carouselSlideWidth
    console.log(newLeft, currentLeft, this.carouselSlideWidth)
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
    $(this.carousel).css({
      'left': "-" + this.newLeftSlide('left') + "px"
    });
    this.isAnimating = true;
    setTimeout(function () { this.isAnimating = false; }, 300);
  }


  // Load Next Image
  arrNext() {
    this.slidePointer++;
    $(this.carousel).css({
      'left': "-" + this.newLeftSlide('right') + "px"
    });
    this.isAnimating = true;
    setTimeout(function () { this.isAnimating = false; }, 300);
  }

  // building the width of the carousel
  carouselInit(index) {
    const carousel = `#carousel-${index} ul`;

    $(carousel + ' li').each(function () {
      this.carouselWidth += this.carouselSlideWidth;
    });
  }



  //2  edition


}
















