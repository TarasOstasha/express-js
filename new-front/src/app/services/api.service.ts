import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getJson(json) {
    return this.http.get('./assets/data/' + json).toPromise();
  }

  login(userData) {
    return this.http.post('http://localhost:3000/login', userData, httpOptions).toPromise();
  }

  register(userData) {
    return this.http.post('http://localhost:3000/register', userData, httpOptions).toPromise();
  }

  getProduct(id) {
    return this.http.get('http://localhost:3000/product/' + id).toPromise(); //productID
  }

  getTodos() {
    return this.http.get<Todo[]>('http://localhost:3000/todos') //leave becouse we don't use it
  }

  setTodos(todos) {
    return this.http.post<Todo[]>('http://localhost:3000/todos', todos, httpOptions) //leave becouse we don't use it
  }

  getSessionInfo() {
    return this.http.get('http://localhost:3000/session-info').toPromise();
  }
  getProducts(): any {
    return this.http.get('http://localhost:3000/products').toPromise(); 
  }

  // search() {
  //   return this.http.get('http://localhost:3000/search'); // dont know
  // }
  getUsers() {
    return this.http.get('http://localhost:3000/users').toPromise();
  }
  setCategories(productCategories) {
    return this.http.post('http://localhost:3000/categories', productCategories, httpOptions).toPromise();
  }
  getCategories() {
    return this.http.get('http://localhost:3000/categories').toPromise();
  }
  addProduct(newProduct) {
    return this.http.post('http://localhost:3000/products', newProduct, httpOptions).toPromise();
  }
  upload(obj) {
    return this.http.post('http://localhost:3000/upload2', obj, httpOptions).toPromise();
  }
  addUserStatistic(obj) {
    return this.http.post('http://localhost:3000/user-statistic', obj, httpOptions).toPromise();
  }
  addVoute(obj) {
    return this.http.post('http://localhost:3000/user-voute', obj, httpOptions).toPromise();
  }
  megaSearch(queryString) {
    return this.http.get(`http://localhost:3000/mega-search${queryString}`).toPromise();
  }
  editProduct(product) {
    return this.http.put('http://localhost:3000/edit-product', product, httpOptions).toPromise();
  }
  contactsMail(mail) {
    return this.http.post('http://localhost:3000/contacts-mail', mail, httpOptions).toPromise();

  }

  getAdminNotifications() {
    return this.http.get('http://localhost:3000/admin-notifications',httpOptions).toPromise();
  }
  getAdminMessages(currentPage, sizePage) {
    return this.http.get('http://localhost:3000/admin-messages/' + currentPage + '?size=' + sizePage, httpOptions).toPromise();
  }
  moveToArchiveAdminMessages(_id) {
    return this.http.put('http://localhost:3000/move-to-archive-admin-messages', { _id }, httpOptions).toPromise();

  }
}


