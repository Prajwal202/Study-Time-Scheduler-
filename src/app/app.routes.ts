import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { ViewTasksComponent } from './pages/view-tasks/view-tasks.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { DeleteConfirmationComponent } from './pages/delete-confirmation/delete-confirmation.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddTaskComponent },
  { path: 'tasks', component: ViewTasksComponent },
  { path: 'edit/:id', component: EditTaskComponent },
  { path: 'delete/:id', component: DeleteConfirmationComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' },
];
