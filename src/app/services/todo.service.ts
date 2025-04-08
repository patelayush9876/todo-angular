import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: string[] = [];

  constructor() {
    this.loadTodos();
  }

  addTodo(todo: string) {
    this.todos.push(todo);
    this.saveTodos();
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
    this.saveTodos();
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadTodos() {
    const data = localStorage.getItem('todos');
    this.todos = data ? JSON.parse(data) : [];
  }
}
