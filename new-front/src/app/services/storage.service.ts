import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getBasketFromStorage() {
    const json = localStorage.getItem('basket');
    if (json == null) return []
    else return JSON.parse(json);
  }
}
