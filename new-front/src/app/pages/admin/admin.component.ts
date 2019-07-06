import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  constructor(
    private api: ApiService
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
        defaultData : {
          states: []
        },
        paymentData :{}
      },
      searchResult: []
    },
    products: [],
    users: []
  }

  ngOnInit() {
    this.api.getProducts().subscribe((fromServer: any)=>{
      this.state.products = fromServer.products;
    },  this.errorHandler )

    this.api.getUsers().subscribe((fromServer: any)=>{
      this.state.users = fromServer.users;
      console.log(fromServer)
    },  this.errorHandler )
  }  

  errorHandler(err) {
    console.log(err);
  }

}
