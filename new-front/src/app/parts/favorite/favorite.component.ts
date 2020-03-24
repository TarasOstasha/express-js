import { Component, OnInit } from '@angular/core';
import appState from '../../app-state';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.less']
})
export class FavoriteComponent implements OnInit {
  appState: any;

  constructor(private api: ApiService) { 
    this.appState = appState;
  }

  ngOnInit() {
  }

}
