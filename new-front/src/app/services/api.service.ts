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


  getTodos() {
    return this.http.get<Todo[]>('http://localhost:3000/todos')
  }

  setTodos(todos) {
    return this.http.post<Todo[]>('http://localhost:3000/todos', todos, httpOptions)
  }
}
