import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { log, toQueryString, getUrlQueries } from '../../my_models/stuff';
import { Queries } from '../../interfaces/queries';
import appState from '../../app-state';
import { Subject, Observable } from "rxjs";
import { debounceTime, distinctUntilChanged} from "rxjs/operators"; 

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
  modelChanged = new Subject<string>();
  searchResult$: Observable<any[]>;
  defaultMinRange = 0;
  defaultMaxRange  = 1000;


  constructor(
    private route: ActivatedRoute,
    private api: ApiService

  ) {
    this.state = appState;
    this.appState = appState;
    this.modelChanged
      .pipe( debounceTime(300) )
      .subscribe(() => {
        this.search();
      })
    this.queries.minPrice = this.defaultMinRange;
    this.queries.maxPrice = this.defaultMaxRange;
  }

  async ngOnInit() {
    $("#range").slider({
      //reversed : true
    });

    $("#range").on("slide", (slideEvt)=> {
      //log(slideEvt.value)
      this.minMaxFileter(slideEvt); 
    });

    log('appState', this.appState)
    let crumbs = this.route.snapshot.paramMap.get('crumbs');
    console.log(crumbs)
    const fromServer: any = await this.api.getProducts();
    this.appState.showedProducts = this.appState.products = fromServer.products;
    this.appState.productCategories = await this.api.getCategories();
    //log(fromServer)
  }

  minMaxFileter(slideEvt) {
    if(slideEvt) {
      this.queries.minPrice = slideEvt.value[0]; // get from 1 val
      this.queries.maxPrice = slideEvt.value[1]; // get second
    }
    const min = this.queries.minPrice;
    const max = this.queries.maxPrice;

    this.appState.showedProducts = this.appState.products.filter(product=>{
      console.log(this.queries.minPrice)
      if(product.price > min && product.price < max) return true
    })
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
    this.minMaxFileter(null);
  }

  changed() {
    this.modelChanged.next();
  }

  rangePrice() {
    // console.log('www')
    // const minElement: any = document.querySelector('.min-slider-handle');
    // const maxElement: any = document.querySelector('.max-slider-handle');
    // const min = Math.round(minElement.style.left.replace(/% ?/g, ""));
    // const max = Math.round(maxElement.style.left.replace(/% ?/g, ""));
    // console.log(min, max)
    // this.appState.products = this.appState.products.filter(product=>{
    //   if(product.price > min && product.price < max) return true
    // })
  }



  //add html filter block
}
