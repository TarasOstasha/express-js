import { Injectable } from '@angular/core';
import state from '../app-state';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  state = state;

  constructor() { }

  async getBasketFromStorage() {
    const basket = await this.getItem('basket');
    return (Array.isArray(basket)) ? basket : [];
  }
  async getFavoriteFromStorage() {
    const favorite = await this.getItem('favorite');
    return (Array.isArray(favorite)) ?  favorite : [];
  }
  async addFavoriteToStorage(product) {
    const favorite = await this.getFavoriteFromStorage()
    console.log(favorite)
    favorite.push(product);
    this.setItem('favorite', favorite);
  }
  // remove from localstorage
  async removeFavoriteFromStorage(index) {
    const favorite = await this.getFavoriteFromStorage()
    console.log(favorite)
    favorite.splice(index, 1);
    this.setItem('favorite', favorite);
  }

  setItem(key, value) { 
    if(typeof(value != 'string') ) value = JSON.stringify(value);
    //return Promise.resolve().then(function () {
      localStorage.setItem(key, value);
    //});
  }
  getItem(key) {
    return Promise.resolve().then(function () {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (error) {
        return null
      }
    });
  }

  clearItem(key) {
    localStorage.removeItem(key);
  }

  refreshBasketStorage() {
    const json = JSON.stringify(state.header.basket.products);
    localStorage.setItem('basket', json);
  }

  //const setItem2 = (key, value) => Promise.resolve().then( () =>  localStorage.setItem(key, value) );
  //const getItem2 = (key) => Promise.resolve().then( () => localStorage.getItem(key));
}
