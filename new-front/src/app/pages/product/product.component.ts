import { Component, OnInit, EventEmitter } from '@angular/core';
import state from '../../app-state';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {
  state: any;
  //private api: ApiService

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) {

    this.state = state;
    this.state.product = {
      img: 0,
      imgs: ['https://images.app.goo.gl/qryHY5QDqt7mmdxZ8']
    },
    this.state.activeSliderImg = [true];
  }
  async getProductIdFromServer() {
    try {
      this.route.paramMap.subscribe(async (params) => {
        const productId = params.get('productId');
        console.log(productId)
        const fromServer: any = await this.api.getProduct(productId);
        this.state.product = fromServer.product;
        console.log(fromServer);
      }, err => {
        console.log(err);
      })

    } catch (error) {
      console.log(error);
    }


  }
  ngOnInit() {
    console.log('state', state)
    this.getProductIdFromServer();

    setInterval(() => {
      console.log('star public', this.starPublic())
    }, 1000)
  }

  starPublic() {
    try {
      return this.state.product.stars.public || 0
    } catch (error) {
      return 0;
    }
  };
  starPrivate() {
    try {
      return this.state.product.stars.private || 0
    } catch (error) {
      return 0;
    }
  };

  buyProduct(event) {
    event.stopPropagation();
    state.header.basket.products.push(this.state.product); //додати продукт в корзину
    this.refreshBasketStorage()
  }
  //duplicate code !!!!
  refreshBasketStorage() {
    const json = JSON.stringify(state.header.basket.products);
    localStorage.setItem('basket', json);
  }

  changeImg(i) {
    this.state.activeSliderImg = [];
    this.state.activeSliderImg[i] = true;
  }
}
