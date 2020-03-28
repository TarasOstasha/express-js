import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import state from '../../app-state';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {
  state: any;
  editFlag: boolean = false;
  newSize;
  newColor;
  url =  state.hostName;
  favoriteProductsLength: any;
  public position: string = '-30em';

  favoriteProductBtn: boolean;
    
  //private api: ApiService

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private storage: StorageService
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
     
      // }, err => {
      //   console.log(err);
      // })

    } catch (error) {
      console.log(error);
    }


  }
  async ngOnInit() {
    // setTimeout(()=>{
    //   this.position = '1em';
    // }, 500)

    //state.header.favoriteBlock // set hidden favorite icon
    this.state.header.favoriteProducts = await this.storage.getFavoriteFromStorage(); 
    console.log(state)
    let id = this.route.snapshot.paramMap.get('productId');
    let statistic: any = {
      user: this.state.header.user.name,
      productId: id
    }
    this.api.addUserStatistic(statistic);
    console.log('state', state)
    this.getProductIdFromServer(id);

    setInterval(() => {
      //console.log('star public', this.starPublic())
    }, 1000)
  }

  starPublic() {
    try {
      return this.state.product.stars.public || 0
    } catch (error) {
      return 0;
    }
  };
  //code dublicate !!!! (product component and card component)
  starPrivate() {
    try {
      const myVoute = this.state.product.stars.voutes.filter((voute)=>{
        return voute.id == this.state.header.user._id;
      })
      //console.log('myvoute', myVoute)
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
    console.log(state.header.basket.products, 'basket.products')
    this.refreshBasketStorage()
  }
  // add favorite products
  async toFavorite(event) {
    this.favoriteProductBtn = true;
    console.log(this.favoriteProductBtn, 'event')
    event.stopPropagation();
    state.header.favoriteProducts.push(this.state.product);
    console.log(state.header.favoriteProducts, '- favoriteProducts')
    const fromServer = await this.api.addFavoriteProducts(this.state.product);
    this.storage.addFavoriteToStorage(this.state.product);
    console.log(fromServer, 'this is products from server');
    this.position = '0'
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


  editForAdmin() {
    this.editFlag = !this.editFlag;
  }
  async saveForAdmin(product) {
    console.log('!!!!!!!saveForAdmin', product)
    this.editFlag = !this.editFlag;
    const fromServer: any = await this.api.editProduct(product);
    console.log('saveForAdmin', fromServer)
    //this api edit priduct
    //create in route path route to new method
  }

  addNewSize() {
    this.state.product.sizes.push(this.newSize);
    this.newSize = '';
  }

  addNewColor() { //newColor
    console.log('state color', this.newColor);
    this.state.product.colorProducts.push(this.newColor);
    this.newColor = '';
  }
}
