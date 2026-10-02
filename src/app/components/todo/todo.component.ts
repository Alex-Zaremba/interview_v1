import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  standalone: true,
})
export class TodoComponent {
  name = signal('Todo');
}
