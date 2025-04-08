// todo.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-todo',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  todoText = '';
  todos: string[] = [];

  addTodo() {
    if (this.todoText.trim()) {
      this.todos.push(this.todoText.trim());
      this.todoText = '';
    }
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
  }
}
