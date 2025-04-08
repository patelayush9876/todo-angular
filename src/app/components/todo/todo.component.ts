import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Todo {
  text: string;
  completed: boolean;
}

@Component({
  standalone: true,
  selector: 'app-todo',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  todoText = '';
  todos: Todo[] = [];

  addTodo() {
    if (this.todoText.trim()) {
      this.todos.push({ text: this.todoText.trim(), completed: false });
      this.todoText = '';
    }
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
  }

  toggleCompleted(index: number) {
    this.todos[index].completed = !this.todos[index].completed;
  }
}
