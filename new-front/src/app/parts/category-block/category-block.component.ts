import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import appState from '../../app-state';

@Component({
  selector: 'app-category-block',
  templateUrl: './category-block.component.html',
  styleUrls: ['./category-block.component.less']
})
export class CategoryBlockComponent implements OnInit {
  appState: any;


  constructor(private api: ApiService) { 
    this.appState = appState;
  }

  async ngOnInit() {
    this.getproductCategories(); 

  }

  async getproductCategories() {
    const fromServer: any = await this.api.getCategories() 
    this.appState.productCategories = fromServer.subCategories; 
  }

}
