import { Component, OnInit } from '@angular/core';

import { trigger, transition, style, animate } from '@angular/animations';
import { ApiService } from '../../services/api.service';
import { Todo } from '../../interfaces/todo'
//import { Observable } from 'rxjs/Observable';
//import { FormGroup, FormControl } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.less'],
  animations: [
    trigger('fade', [
      //transition in
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(1000, style({ opacity: 1, transform: 'translateY(0px)' }))
      ]),
      //transition out
      transition(':leave', [
        animate(1000, style({ opacity: 0, transform: 'translateY(30px)' }))
      ])

    ])
  ]
})
export class AboutUsComponent implements OnInit {
  pageTitle: string = "Notice List";
  todos: Todo[] = [];
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;

  constructor(
    
    private api: ApiService
  ) { }


  ngOnInit() {
    this.filter = 'all';
    this.beforeEditCache = '';
    this.idForTodo = 4;
    this.todoTitle = '';
    //this.setFakeTodo();
    this.getTodoFromServer();
  }

  getTodoFromServer() {
    this.api.getTodos().subscribe(
      (dataBackend) => {
        this.todos = dataBackend;
      },
      (error) => { console.log(error) }
    )
  }

  refreshOnServer() {
    this.api.setTodos(this.todos).subscribe(
      (data) => {
        console.log(data + 'data from server');
      },
      (error) => { console.log(error) }
    )
  }

  // setFakeTodo() {
  //   this.todos = [
  //     {
  //       'id': 1,
  //       'title': 'to do my home work',
  //       'completed': false,
  //       'editing': false
  //     }
  //   ]
  // }

  addTodo(): void {
    if (this.todoTitle.trim().length < 5) {
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
    this.refreshOnServer();
    
  }
  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
    this.refreshOnServer();
  }
  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.refreshOnServer();
  }
  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
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
    if (this.filter === 'all') {
      return this.todos
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed)
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed)
    }
    return this.todos
  }
  toUpperCase(): void {
    setTimeout(() => {
      this.todoTitle = this.todoTitle.toLocaleUpperCase();
    }, 0)
  }



}


//node module connect
