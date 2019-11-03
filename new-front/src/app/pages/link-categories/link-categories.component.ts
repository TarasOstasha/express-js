import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { log, toQueryString, getUrlQueries } from '../../my_models/stuff';
import  appState  from '../../app-state';


declare const $: any;

@Component({
  selector: 'app-link-categories',
  templateUrl: './link-categories.component.html',
  styleUrls: ['./link-categories.component.less']
})
export class LinkCategoriesComponent implements OnInit {
  state: any;
  appState: any;
  products = []


  constructor(
    private route: ActivatedRoute,
    private api: ApiService

  ) { 
    this.state = appState;
    this.appState = appState;
  }

  async ngOnInit() {
    log(this.state)
    let crumbs = this.route.snapshot.paramMap.get('crumbs');
    console.log(crumbs)

    const fromServer: any = await this.api.getProducts();
    this.products = fromServer.products;
    this.appState.productCategories = await this.api.getCategories();
    log(fromServer)
  }
  
  queries: any = getUrlQueries()

  async search() {
    try {
      const queryString = toQueryString(this.queries);
      const serverResponse = await this.api.megaSearch(queryString);
      log(serverResponse)
      
      //next - show cards in this component like in main page 
      // work with others input and transfer to obj queries
    } catch (error) {
      log(error);
    }

      

  }


  toggleFilter = true;





  // parse crumbs
  // req to server
  // view to show array of product, link of crumbs and filter block on the top


  //add html filter block

}
