import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { log, toQueryString, getUrlQueries } from '../../my_models/stuff';
import { Queries } from '../../interfaces/queries';
import appState from '../../app-state';

declare const $: any;

@Component({
  selector: 'app-mega-search',
  templateUrl: './mega-search.component.html',
  styleUrls: ['./mega-search.component.less']
})
export class MegaSearchComponent implements OnInit {



  queries: Queries = getUrlQueries();
  state: any;
  appState: any;


  constructor(
    private route: ActivatedRoute,
    private api: ApiService

  ) {
    this.state = appState;
    this.appState = appState;
  }

  async ngOnInit() {
    $("#range").slider({
      //reversed : true
    });

    $("#range").on("slide", (slideEvt)=> {
      log(slideEvt.value)
      this.queries.minPrice = slideEvt.value[0]; // get from 1 val
      this.queries.maxPrice = slideEvt.value[1]; // get second
    });


    log('appState', this.appState)
    let crumbs = this.route.snapshot.paramMap.get('crumbs');
    console.log(crumbs)
    const fromServer: any = await this.api.getProducts();
    this.appState.products = fromServer.products;
    this.appState.productCategories = await this.api.getCategories();
    //log(fromServer)
  }


  async search() {
    try {
      this.queries.breadCrumbs = this.appState.breadCrumbs;
      const queryString = toQueryString(this.queries);
      const serverResponse = await this.api.megaSearch(queryString);
      log(serverResponse)
      this.appState.products = serverResponse;
    } catch (error) {
      log(error);
    }



  }


  toggleFilter = true;
  sortByPriceFlag = false;

  //sort products from lover to hight and hight to lover
  sortByPrice() {
    this.sortByPriceFlag = !this.sortByPriceFlag;
    if (this.sortByPriceFlag) {
      this.appState.products = this.appState.products.sort((a, b) => a.price - b.price);
    } else {
      this.appState.products = this.appState.products.sort((a, b) => b.price - a.price);

    }
  }





  //add html filter block
}
