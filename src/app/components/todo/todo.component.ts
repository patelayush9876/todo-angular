import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, Todo } from '../../services/todo.service'; // Ensure correct path

@Component({
  standalone: true,
  selector: 'app-todo',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoText = '';
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(data => {
      this.todos = data;
    });
  }

  addTodo() {
    const newTodo = {
      text: this.todoText,
      completed: false,
    };
  
    this.todoService.addTodo(newTodo).subscribe({
      next: (addedTodoFromServer) => {
        const todoWithUIProps = {
          ...addedTodoFromServer,
          editing: false // <-- This is needed for your UI toggle logic
        };
        this.todos.push(todoWithUIProps); // push only after data is returned fully
        this.todoText = ''; // clear input field
      },
      error: (error) => {
        console.error('Error adding todo:', error);
      }
    });
  }
  
  

  deleteTodo(index: number) {
    const todo = this.todos[index];
    if (!todo._id) return;
    this.todoService.deleteTodo(todo._id).subscribe(() => {
      this.todos.splice(index, 1);
    });
  }
  
  toggleCompleted(index: number) {
    const todo = this.todos[index];
    todo.completed = !todo.completed;
  
    this.todoService.updateTodo(todo).subscribe({
      next: (updatedTodo) => {
        this.todos[index] = updatedTodo;
      },
      error: (err) => {
        console.error('Error updating todo:', err);
        // Optionally revert state
        todo.completed = !todo.completed;
      }
    });
  }

  editTodo(index: number) {
    this.todos[index].editing = true;
  }
  
  saveTodo(index: number) {
    const todo = this.todos[index];
    todo.editing = false;
  
    this.todoService.updateTodo(todo).subscribe({
      next: (updatedTodo) => {
        this.todos[index] = updatedTodo;
      },
      error: (err) => {
        console.error('Error updating todo:', err);
      }
    });
  }
}  