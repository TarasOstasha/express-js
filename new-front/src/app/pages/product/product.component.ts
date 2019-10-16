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
  async getProductIdFromServer(id) {
    try {
      //this.route.paramMap.subscribe(async (params) => {

        //const productId = params.get('productId');
        console.log(id)
        const fromServer: any = await this.api.getProduct(id);
        this.state.product = fromServer.product;
        console.log(fromServer);
      // }, err => {
      //   console.log(err);
      // })

    } catch (error) {
      console.log(error);
    }


  }
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('productId');
    let statistic: any = {
      user: this.state.header.user.name,
      productId: id
    }
    this.api.addUserStatistic(statistic);
    console.log('state', state)
    this.getProductIdFromServer(id);

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
      const myVoute = this.state.product.stars.voutes.filter((voute)=>{
        return voute.id == this.state.header.user._id;
      })
      console.log('myvoute', myVoute)
      return myVoute[0].voute * 20 || 0
    } catch (error) {
      return 0;
    }
  };
  productId() {
    try {
      return this.state.product._id 
    } catch (error) {
      return 0;
    }
  }

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
