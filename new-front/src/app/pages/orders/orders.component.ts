import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { toQueryString, getUrlQueries } from '../../my_models/stuff';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less']
})
export class OrdersComponent implements OnInit {

  constructor(private api: ApiService) { }
  //pagination
  currentPage: number = 1;
  pagesAmount = 0; // length of pagination
  pagesAmountArray = [] // for rendering buttons of pagination
  //
  allNotifications: any = {}; // all type of notifications in admin panel on the top level
  notificationAmount: number; // all messages from customer
  searchString: string = ''
  sizePage = 8; // quantity of product per page
  transactionList: any = [];

  checkStatus: any = [];



  ngOnInit() {
    this.search();
    this.getNotifications();
  }


  async search() {
    const queryString = toQueryString({
      query: this.searchString,
      fromModel: 'Transaction',
      fields: ['productName', '', 'status'], // totalPrice - error???
      size: this.sizePage
    });

    const fromServer: any = await this.api.getUniversalSearch(this.currentPage, queryString);
    this.transactionList = fromServer.documents;
    this.recalcPagination(fromServer.amount);
    console.log('fromServer', this.transactionList)
  }

  async recalcPagination(notificationAmount) {
    this.pagesAmount = Math.ceil(notificationAmount / this.sizePage); // get quantity of pages in pagination
    this.pagesAmountArray = Array.from(Array(this.pagesAmount).keys()) // generate buttons from pagination
    this.pagesAmountArray.shift(); // remove first element (0) to start pagination from number 1
    this.pagesAmountArray.push(this.pagesAmount); // add last page to array
    console.log('pagesAmountArray', this.pagesAmountArray)
  }

  clickPagination(btnIndex: number) {
    console.log('index', btnIndex);
    this.currentPage = btnIndex;
    this.search();
  }

  k = 1;
  //arrows in head table
  statusProducts: boolean = false;
  statusUsers: boolean = false;
  // sort orders on the page
  sortTableProduct(key) {
    this.statusProducts = !this.statusProducts;
    if (this.k == 1) this.k = -1
    else this.k = 1;
    this.transactionList = this.transactionList.sort((a, b) => {
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

  async getNotifications() {
    //this.allNotifications = await this.api.getAdminNotifications();
    //this.notificationAmount = this.allNotifications.notificationAmount;
    //this.pagesAmount = Math.ceil(this.notificationAmount / this.sizePage); // get quantity of pages in pagination
    //this.pagesAmountArray = Array.from(Array(this.pagesAmount).keys()) // generate buttons from pagination
    //this.pagesAmountArray.shift(); // remove first element (0) to start pagination from number 1
    //this.pagesAmountArray.push(this.pagesAmount); // add last page to array
    //console.log('currentPageNgOnInit', this.currentPage);
    //console.log('pagesAmountArray', this.pagesAmountArray)
  }

  transactionDone(index) {
    console.log(index, 'current row')
    this.checkStatus[index] = !this.checkStatus[index];
    
  }

  async moveToArchive(id) {
    const fromServer: any = await this.api.moveToTransactionArchive(id);
    console.log('****ALL MESSAGES IN ARCHIVE***', fromServer);
    //this.getNotifications();

  }
  

}
