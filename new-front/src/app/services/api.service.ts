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
}


