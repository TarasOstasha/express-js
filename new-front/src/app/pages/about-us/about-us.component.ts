import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
//import { FormGroup, FormControl } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.less']
})
export class AboutUsComponent implements OnInit {
  pageTitle: string = "Notice List";
  todos: Todo[];
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;
  constructor(private http: HttpClient) { 
    
  }

  getTodos() {
    return this.http.get<Todo[]>('http://localhost:3000/todos')
  }
  ngOnInit() {
    this.filter = 'all';
    this.beforeEditCache = '';
    this.idForTodo = 4;
    this.todoTitle = '';
    this.getTodos().subscribe(
      (data) => {
        console.log(data);
        this.todos = data;
      }, 
      (error) => { console.log(error) }
    )
    this.todos = [
      {
        'id': 1,
        'title': 'to do my home work',
        'completed': false,
        'editing': false
      }
      
    ]
  }

	addTodo(): void {
    if(this.todoTitle.trim().length < 5) {
      return;
    }

    this.todos.push({
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false
    })
    this.todoTitle = "";
    this.idForTodo++;
  }
  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }
  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
  doneEdit(todo: Todo): void {
    if(todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
  }
  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }
  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }
  atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
  }
  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }
  checkAllTodos(): void {
    this.todos.forEach(todo => todo.completed = (<HTMLInputElement>event.target).checked);
  }
  todosFiltered(): Todo[] {
    if(this.filter === 'all') {
      return this.todos
    }else if(this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed)
    }else if(this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed)
    }
    return this.todos
  }

}

interface Todo {
  id: number, 
  title: string,
  completed: boolean,
  editing: boolean
}

//module cors to backend