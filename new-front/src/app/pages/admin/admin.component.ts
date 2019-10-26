import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SearchService } from '../../services/search.service';
import { Subject } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import appState from '../../app-state';
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
  state = appState.pages.admin;
  constructor(
    private api: ApiService,
    private searchService: SearchService
  ) { }

 

  async ngOnInit() {
    try {
      const fromServer: any = await this.api.getProducts();
      this.state.products = fromServer.products;
      //console.log(this.state.products);
      const users: any = await this.api.getUsers()
      this.state.users = users.users;

      //console.log(users)
      const results: any = await this.searchService.search(this.searchTerm$)
      //this.state.products = results;
      //console.log(results);
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
    console.log('getproductCategories')
    const fromServer: any = await this.api.getCategories()
    console.log('getproductCategories', fromServer)

    this.state.newProduct.productCategories = fromServer;
    this.errorHandler
  }


//example
  // userFilter() {
  //   const users = JSON.parse(JSON.stringify(this.state.users));
  //   const _value = (users || [])
  //   if (this.state.table.user.search !== '') {
  //     const patt = new RegExp(this.state.table.user.search);
  //     const result = _value.filter(item => patt.test(item.firstName))
  //     return result
  //   } else return _value
  // }

  //length array = 20 el
  //limit = 5
  //current page 1
  //output from 0 to 4 el (1-5)
  //end = page * limit -1
  //start = end - limit
  //getter
  get clipped_users() {
    const table = this.state.table.user;
    //const users = JSON.parse(JSON.stringify(this.state.users)); // copy object instead link
    const users = this.clone(this.state.users);
    //const range = this.state.table.user.range //limit
    const end = this.tableEnd(table);
    const start = this.tableStart(table);
    //const corrected_end = (end > users.length) ? users.length : end
    const corrected_end = this.tableActuallyEnd(table, users);
    const result = (users.length > 0) ? users.splice(start, corrected_end) : users
    //console.log('clipped', 'start-', start, 'end-', corrected_end, 'users', users, 'result-', result, 'limit-', table.range)
    return result;
  }

  get clipped_products() {
    const table = this.state.table.product;
    const products = this.clone(this.state.products);
    const end = this.tableEnd(table);
    const start = this.tableStart(table);
    const corrected_end = this.tableActuallyEnd(table, products);
    const result = (products.length > 0) ? products.splice(start, corrected_end) : products
    //console.log('result-', result)
    return result;
  }

  //example of clone
  // clone1(obj) {
  //   return JSON.parse(JSON.stringify(obj));
  // }

  clone = (obj) => JSON.parse(JSON.stringify(obj)); // the same as clone1

  //table = this.state.table.user
  tableEnd = (table) =>  table.range * table.page;
  tableStart = (table) => this.tableEnd(table) - table.range;
  tableActuallyEnd = (table, arr) => (this.tableEnd(table) > arr.length) ? arr.length : this.tableEnd(table);
  
  numToArray(number) {
    const listOfPagination = [];
    for(let i = 1; i < number+1; i++) {
      //console.log('this is I', i)
      listOfPagination.push(i);
    }
    return listOfPagination;
  }

  amountOfPage(table, arr) {
    //console.log('arr', arr, 'table', table)
    return Math.ceil(arr.length / table.range);
    
  }
  //pagination of Users Data Table
  clickPagination(currentPage) {
    this.state.table.user.page = currentPage;
  }
  //pagination of Products Data Table
  clickPagination1(currentPage) {
    this.state.table.product.page = currentPage;
  }
}

//read about getter and setter!!!
