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
    return this.http.get('./assets/data/' + json)
  }

  login(userData) {
    return this.http.post('http://localhost:3000/login', userData, httpOptions)
  }

  register(userData) {
    return this.http.post('http://localhost:3000/register', userData, httpOptions)
  }

  getTodos() {
    return this.http.get<Todo[]>('http://localhost:3000/todos')
  }

  setTodos(todos) {
    return this.http.post<Todo[]>('http://localhost:3000/todos', todos, httpOptions)
  }

  getSessionInfo() {
    return this.http.get('http://localhost:3000/session-info');
  }
  getProducts() {
    return this.http.get('http://localhost:3000/products');
  }

  search() {
    return this.http.get('http://localhost:3000/search');
  }
}


