import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  appState  from '../app-state';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
// 
// if(location.hostname == 'localhost') var url = 'http://localhost'; //dev
// else var url = ''; //production
var url =  appState.hostName;
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getImgUrlsSlider() {
    return this.http.get(url + 'img-urls-slider').toPromise();
  }

  getJson(json) {
    return this.http.get('./assets/data/' + json).toPromise();
  }

  login(userData) {
    return this.http.post(url + 'login', userData, httpOptions).toPromise();
  }

  register(userData) {
    return this.http.post(url + 'register', userData, httpOptions).toPromise();
  }

  getProduct(id) {
    return this.http.get(url + 'product/' + id).toPromise(); //productID
  }

  addFavoriteProducts(product) {
    return this.http.post( url + 'favorite-products', product ,httpOptions ).toPromise();
  }

  getTodos() {
    return this.http.get<Todo[]>(url + 'todos') //leave becouse we don't use it
  }

  setTodos(todos) {
    return this.http.post<Todo[]>(url + 'todos', todos, httpOptions) //leave becouse we don't use it
  }

  getSessionInfo() {
    return this.http.get(url + 'session-info').toPromise();
  }
  getProducts(): any {
    return this.http.get(url + 'products').toPromise(); 
  }

  // search() {
  //   return this.http.get(url + '/search'); // dont know
  // }
  getUsers() {
    return this.http.get(url + 'users').toPromise();
  }
  setCategories(productCategories) {
    return this.http.post(url + 'categories', productCategories, httpOptions).toPromise();
  }
  getCategories() {
    return this.http.get(url + 'categories').toPromise();
  }
  addProduct(newProduct) {
    return this.http.post(url + 'products', newProduct, httpOptions).toPromise();
  }
  upload(obj) {
    return this.http.post(url + 'upload2', obj, httpOptions).toPromise();
  }
  addUserStatistic(obj) {
    return this.http.post(url + 'user-statistic', obj, httpOptions).toPromise();
  }
  addVoute(obj) {
    return this.http.post(url + 'user-voute', obj, httpOptions).toPromise();
  }
  megaSearch(queryString) {
    return this.http.get(`${url}mega-search${queryString}`).toPromise();
  }
  editProduct(product) {
    return this.http.put(url + 'edit-product', product, httpOptions).toPromise();
  }
  contactsMail(mail) {
    return this.http.post(url + 'contacts-mail', mail, httpOptions).toPromise();

  }

  getAdminNotifications() {
    return this.http.get(url + 'admin-notifications',httpOptions).toPromise();
  }
  getAdminMessages(currentPage, sizePage) {
    return this.http.get(url + 'admin-messages/' + currentPage + '?size=' + sizePage, httpOptions).toPromise();
  }

  moveToArchiveAdminMessages(_id) {
    return this.http.put(url + 'move-to-archive-admin-messages', { _id }, httpOptions).toPromise();
  }

  moveToTransactionArchive(_id) {
    return this.http.put( url + 'transaction-archive', { _id }, httpOptions ).toPromise();
  }

  moveToTransactionFromArchive(_id) {
    return this.http.put( url + 'archive-to-transaction', { _id }, httpOptions ).toPromise();
  }

  getAdminMessagesFromArchive(currentPage, sizePage) {
    return this.http.get(url + 'admin-messages-archive/' + currentPage + '?size=' + sizePage, httpOptions).toPromise();
  }
  getTransactionsFromArchive(currentPage, sizePage) {
    return this.http.get(url + 'admin-transactions-archive/' + currentPage + '?size=' + sizePage, httpOptions).toPromise();

  }  

  payPalPayment(obj){
    return this.http.post( url + 'paypal-approve', obj, httpOptions).toPromise();
  }

  getUniversalSearch(currentPage, queryString) {
    return this.http.get(`${url}universal-search/${currentPage}${queryString}`, httpOptions).toPromise();

  }

  createFingerPrint(systemInfo) {
    console.log(systemInfo)
    return this.http.post(url + 'session', systemInfo, httpOptions).toPromise(); 
  }

  getClientMsgFromChat() {
    return this.http.get(url + 'chat-client-msg', httpOptions).toPromise();
  }

  getUserInfoIfLogged() {
    return this.http.get(url + 'get-user-info-if-logged', httpOptions).toPromise();
  }

  createPromo(newPromoCode) {
    return this.http.post(url + 'create-promo-code', newPromoCode, httpOptions).toPromise();
  }

  getPromoCode(promoCode) {
    return this.http.get(url + `promo-code/${promoCode}`, httpOptions).toPromise();
  }

  // getAll(model, currentPage, sizePage) {
  //   return this.http.get(`http://localhost:3000/all/${model}/${currentPage}?size=${sizePage}` , httpOptions).toPromise();
  // }

}


