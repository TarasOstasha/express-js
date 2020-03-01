import { OnInit, Component } from '@angular/core';
import { trigger, transition, style, animate, keyframes, query, stagger } from '@angular/animations';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '../../services/api.service';
import appState from '../../app-state';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.less'],
  animations: [
    trigger('slideInOut1', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('500ms linear', style({ opacity: '1' }))
      ]),
      transition(':leave', [
        animate('500ms linear', style({ opacity: '0' }))
      ])
    ])
  ]

})
export class CarouselComponent implements OnInit {
  constructor(private api: ApiService) {

  }
  url =  appState.hostName;
  test: string = 'test taras'
  imgSlides: any = [];
  // imgSlides: any = [
  //   {
  //     img: 'assets/img/image.jpg',
  //   },
  //   {
  //     img: 'assets/img/2015-Nike-Mag-02_hd_1600.jpg'
  //   },
  //   {
  //     img: 'assets/img/18-420_Nike_Paul_George_3_Heroes_04_Surface-02_rectangle_1600.jpg'
  //   }


    // {
    //   img: 'assets/img/2U3A5415.jpg'
    // }

  //]
  slidePointer = 0;


  endSlider;
  startSlider;

  async ngOnInit() {
    //slider 24
    setInterval(this.moveRight, 5000);
    const fromServer = await this.api.getImgUrlsSlider();
    console.log(fromServer, 'slider-mainpage')
    this.imgSlides = fromServer;
    this.endSlider = this.imgSlides.length - 1; // останній елемент в масиві
    this.startSlider = this.imgSlides[0]; // 1 елемент в масиві
  }

  moveLeft() {
    if (this.slidePointer == 0) this.slidePointer = this.endSlider
    else this.slidePointer--;

  }

  moveRight() {
    console.log('before', this.slidePointer)
    this.startSlider = 'test';
    if (this.slidePointer == this.endSlider) { //тут оприділяю що в нас наш каунтер дійшов до кінця масиву
      this.slidePointer = 0; // обнуляю каунтер 
      console.log('if')
    } else this.slidePointer++;  // тут каунтер збільшую 
    console.log('after', this.slidePointer, this.endSlider)


  }



}

