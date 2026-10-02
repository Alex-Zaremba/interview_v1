import { Route, Routes } from "@angular/router";
import { TodoComponent } from "./components/todo/todo.component";
import { MainComponent } from "./components/main/main.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Main',
    component: MainComponent,
  },
  {
    path: 'todo',
    pathMatch: 'full',
    title: 'Main',
    component: TodoComponent,
  },
];