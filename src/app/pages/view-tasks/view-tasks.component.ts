import { Component } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-tasks',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './view-tasks.component.html',
  styleUrl: './view-tasks.component.css',
})
export class ViewTasksComponent {
  tasks: Task[] = [];
  displayedColumns = ['subject', 'priority', 'timeNeeded', 'actions'];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.getActiveTasks();
  }

  editTask(id: number) {
    this.router.navigate(['/edit', id]);
  }

  deleteTask(id: number) {
    this.router.navigate(['/delete', id]);
  }

  markCompleted(id: number) {
    this.taskService.markCompleted(id);
    this.loadTasks();
  }
}
