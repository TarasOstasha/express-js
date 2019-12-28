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
  currentPage: number = 1;
  searchString: string = 'tony'
  sizePage = 3; // quantity of product per page
  transactionList: any = [];

  ngOnInit() {
    this.search();
  }


  async search() {
    const queryString = toQueryString({
      query: this.searchString,
      fromModel: 'Transaction',
      fields: ['productName'],
      size: this.sizePage
    });
    const fromServer: any = await this.api.getUniversalSearch(this.currentPage, queryString);
    this.transactionList = fromServer.documents;
    // this.recalcPagination(fromServer.amount);
    console.log('fromServer', this.transactionList)
  }

}
