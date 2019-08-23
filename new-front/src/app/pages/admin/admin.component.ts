import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SearchService } from '../../services/search.service';
import { Subject } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

//import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
@Pipe({
  name: 'search'
})
export class AdminComponent implements OnInit {
  searchTerm$ = new Subject<string>();

  constructor(
    private api: ApiService,
    private searchService: SearchService
  ) { }

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
    newProduct: {
      productName: '',
      productPrice: 0,
      productCategories: [],
      checkedCategory: ''
    },
    userTableRange: 5,
    userTablePage: 1,
    userSearch: '',
    productSearchResult: [], // idea???
    userSearchResult: [] // idea???
  }

  async ngOnInit() {
    try {
      const fromServer: any = await this.api.getProducts();
      this.state.products = fromServer.products;
      console.log(this.state.products);
      const users: any = await this.api.getUsers()
      this.state.users = users.users;

      //console.log(users)
      const results: any = await this.searchService.search(this.searchTerm$)
      //this.state.products = results;
      console.log(results);
      this.getproductCategories();
    } catch (error) {
      this.errorHandler(error);
    }

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

  async getproductCategories() {
    const fromServer: any = await this.api.getCategories()
    this.state.newProduct.productCategories = fromServer;
    this.errorHandler
  }

 

  userFilter() {
    const users = JSON.parse(JSON.stringify(this.state.users));
    const _value = (users || [])
    if (this.state.userSearch !== '') {
      const patt = new RegExp(this.state.userSearch);
      const result = _value.filter(item => patt.test(item.firstName))
      return result
    } else return _value
  }

 //length array = 20 el
  //limit = 5
  //current page 1
  //output from 0 to 4 el (1-5)
  //end = page * limit -1
  //start = end - limit
  //getter
  get clipped_users() {
    const users = this.userFilter();
    const range = this.state.userTableRange //limit
    const page = this.state.userTablePage // page
    const end = page * range;
    const start = end - range;

    const corrected_end = (end > users.length) ? users.length : end
    const result = (users.length > 0) ? users.splice(start, corrected_end) : users
    console.log('clipped', 'start-', start, 'end-', corrected_end, 'users', users, 'result-', result, 'limit-', range)
    return result;
  }




}


