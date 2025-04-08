// app.component.ts
import { Component } from '@angular/core';
import { TodoComponent } from './components/todo/todo.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [TodoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-vite-angular';
}
