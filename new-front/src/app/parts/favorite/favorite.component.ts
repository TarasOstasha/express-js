import { Component, OnInit } from '@angular/core';
import appState from '../../app-state';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.less']
})
export class FavoriteComponent implements OnInit {
  appState: any;
  


  url =  appState.hostName;
  favoriteBoxFlag: boolean = false;

  constructor(private api: ApiService, private storage: StorageService) { 
    this.appState = appState;
  }

  ngOnInit() {

  }

  remove(index) {
    this.appState.header.favoriteProducts.splice(index, 1);
    this.storage.removeFavoriteFromStorage(index)
  }
  refreshBasketStorage() {
    const json = JSON.stringify(appState.header.basket.products);
    localStorage.setItem('basket', json);
  }
  addFavoriteProductToBasket(index) {
    //console.log(index)
    const currentProduct = this.appState.header.favoriteProducts.splice(index, 1);
    this.appState.header.basket.products.push(currentProduct[0]);
    console.log(currentProduct[0], 'current product');
    console.log(this.appState.header.basket.products, 'products basket')
    this.refreshBasketStorage()
  }
}
