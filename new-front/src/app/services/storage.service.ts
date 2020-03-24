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
  getFavoriteFromStorage() {
    const json = localStorage.getItem('favorite');
    if (json == null) return []
    else return JSON.parse(json);
  }
  async addFavoriteToStorage(product) {
    const allProductsJson = await this.getItem('favorite');
    console.log(allProductsJson)
    const allProducts = JSON.parse(allProductsJson);
    allProducts.push(product);
    this.setItem('favorite', allProducts);
  }

  setItem(key, value) { 
    if(typeof(value != 'string') ) value = JSON.stringify(value);
    //return Promise.resolve().then(function () {
      localStorage.setItem(key, value);
    //});
  }
  getItem(key) {
    return Promise.resolve().then(function () {
      return localStorage.getItem(key);
    });
  }

  clearItem(key) {
    localStorage.removeItem(key);
  }
  //const setItem2 = (key, value) => Promise.resolve().then( () =>  localStorage.setItem(key, value) );
  //const getItem2 = (key) => Promise.resolve().then( () => localStorage.getItem(key));
}
