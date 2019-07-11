import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SearchService } from '../../services/search.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {
  searchTerm$ = new Subject<string>();

  constructor(
    private api: ApiService,
    private searchService: SearchService
  ) {}

  state = {
    header: {
      isLogged: false,
      user: {
        name: ''
      },
      basket: {
        open: false,
        products: [],
        defaultData: {
          states: []
        },
        paymentData: {}
      },
      searchResult: [],
    },
    products: [],
    productPage: 1, 
    productChunk: 10,
    users: [],
    newProduct: { productName: '',
                  productPrice: [],
                  productCategories : [],
                  checkedCategory: ''
                },
    productSearchResult: [], // idea???
    userSearchResult: [] // idea???
  }

  ngOnInit() {
    this.api.getProducts().subscribe((fromServer: any) => {
      this.state.products = fromServer.products;
    }, this.errorHandler)

    this.api.getUsers().subscribe((fromServer: any) => {
      this.state.users = fromServer.users;
      console.log(fromServer)
    }, this.errorHandler)

    this.searchService.search(this.searchTerm$)
      .subscribe((results: any) => {
        //this.state.productSearchResult = results;
        this.state.products = results;
        console.log(results);
      });
  }

  //method

  errorHandler(err) {
    console.log(err);
  }
  k = 1;
  //arrows in head table
  statusProducts: boolean = false;
  statusUsers: boolean = false;

  //sort all products
  sortTableProduct(key) {
    this.statusProducts = !this.statusProducts;
    if (this.k == 1) this.k = -1
    else this.k = 1;
    this.state.products = this.state.products.sort((a, b) => {
      var x = a[key]//.toLowerCase();
      if (typeof x === 'string') {
        x = x.toLowerCase();
      }
      var y = b[key]//.toLowerCase();
      if (typeof y === 'string') {
        y = y.toLowerCase();
      }
      return x < y ? -1 * this.k : x > y ? 1 * this.k : 0;
    });
  }
  //sort all users
  sortTableUsers(key) {
    this.statusUsers = !this.statusUsers;
    if (this.k == 1) this.k = -1
    else this.k = 1;
    this.state.users = this.state.users.sort((a, b) => {
      var x = a[key]//.toLowerCase();
      if (typeof x === 'string') {
        x = x.toLowerCase();
      }
      var y = b[key]//.toLowerCase();
      if (typeof y === 'string') {
        y = y.toLowerCase();
      }
      return x < y ? -1 * this.k : x > y ? 1 * this.k : 0;
    });
  }

}
